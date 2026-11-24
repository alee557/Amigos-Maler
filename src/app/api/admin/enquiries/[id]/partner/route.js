import { randomBytes,createHash } from "node:crypto";
import { sql } from "@/lib/db";
import { ADMIN_SESSION_COOKIE,verifyAdminSession } from "@/lib/session";
import { sendServiceEmail } from "@/lib/offerCalculator/email";

export async function POST(request,{params}) {
  if (!await verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) return new Response(null,{status:401});
  const {id}=await params;
  const [app]=await sql`select email from consultations where id=${id} and project_type='Partner application' and status='APPROVED'`;
  if(!app) return new Response(null,{status:404});
  const data=await request.json().catch(()=>({}));
  if(data.action==="invite") {
    if(!process.env.SITE_ORIGIN) return new Response(null,{status:503});
    const token=randomBytes(24).toString("hex");
    const hash=createHash("sha256").update(token).digest("hex");
    await sql`insert into partner_access(application_id,token_hash,expires_at) values(${id},${hash},now()+ interval '24 hours')
      on conflict(application_id) do update set token_hash=excluded.token_hash,expires_at=excluded.expires_at`;
    const delivered=await sendServiceEmail(app.email,"Amigos partner access",
      "Sign in with this email address at "+process.env.SITE_ORIGIN+"/customer/partner and enter your access code within 24 hours:\n"+token,"partner-invite-"+hash);
    return new Response(null,{status:delivered?204:503});
  }
  if(data.action==="assign" && typeof data.project==="string" && typeof data.brief==="string" && data.brief.trim() && data.brief.length<=1500) {
    const rows=await sql`insert into partner_assignments(application_id,project_id,partner_brief)
      select access.application_id,p.id,${data.brief.trim()} from partner_access access join projects p on p.id=${data.project}
      where access.application_id=${id} and access.account_id is not null
      on conflict(application_id,project_id) do update set partner_brief=excluded.partner_brief returning project_id`;
    return new Response(null,{status:rows.length?204:400});
  }
  if(data.action==="remove" && typeof data.project==="string"){
    await sql`delete from partner_assignments where application_id=${id} and project_id=${data.project}`;
    return new Response(null,{status:204});
  }
  return new Response(null,{status:400});
}
