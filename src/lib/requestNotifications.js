import { sql } from "@/lib/db";
import { sendProjectEnquiryEmail, sendServiceEmail } from "@/lib/offerCalculator/email";

export async function notifyRequest(id) {
  const [row]=await sql`select name,email,phone,project_type as "projectType",message,metadata from consultations where id=${id}`;
  if(!row) return false;
  const locale=row.metadata?.locale || "de";
  const labels={
    de:["Amigos Maler – Anfrage erhalten","Wir haben Ihre Anfrage erhalten. Ihre Referenz"],
    en:["Amigos Maler – request received","We received your request. Your reference"],
    es:["Amigos Maler – solicitud recibida","Hemos recibido su solicitud. Su referencia"]
  };
  const [subject,body]=labels[locale] || labels.de;
  const recipients={"Damage report":process.env.DAMAGE_NOTIFICATION_EMAIL,"Partner application":process.env.PARTNER_NOTIFICATION_EMAIL,
    "Property listing":process.env.IMMO_NOTIFICATION_EMAIL,"Property enquiry":process.env.IMMO_NOTIFICATION_EMAIL};
  const methods={
    staff:async()=>(await sendProjectEnquiryEmail({...row,to:recipients[row.projectType],deliveryKey:"request-staff-"+id})).delivered,
    visitor:()=>sendServiceEmail(row.email,subject,body+" — "+id,"request-visitor-"+id)
  };
  const sent=await Promise.all(Object.entries(methods).map(async ([channel,send])=>{
    if(row.metadata?.[channel+"Sent"]) return true;
    try{
      if(!await send()) return false;
      await sql`update consultations set metadata=metadata || ${sql.json({[channel+"Sent"]:true})}::jsonb where id=${id}`;
      return true;
    } catch {return false;}
  }));
  return sent.every(Boolean);
}
