import { createHash } from "node:crypto";
import { sql } from "@/lib/db";
import { SESSION_COOKIE, verifyCustomerSession } from "@/lib/session";

export async function POST(request) {
  const session=await verifyCustomerSession(request.cookies.get(SESSION_COOKIE)?.value);
  if(!session?.email) return new Response(null,{status:401});
  const {token}=await request.json().catch(()=>({}));
  if(typeof token!=="string" || !/^[a-f0-9]{48}$/.test(token)) return new Response(null,{status:400});
  const hash=createHash("sha256").update(token).digest("hex");
  const rows=await sql`update partner_access a set account_id=c.id, token_hash=null, expires_at=null
    from customers c, consultations r where r.id=a.application_id and r.status='APPROVED' and r.project_type='Partner application'
    and lower(r.email)=lower(c.email) and lower(c.email)=lower(${session.email}) and a.token_hash=${hash} and a.expires_at>now()
    returning a.application_id`;
  return new Response(null,{status:rows.length?204:400});
}
