import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE,verifyCustomerSession } from "@/lib/session";
import { sql } from "@/lib/db";
import PartnerControls from "@/components/admin/PartnerControls";
import styles from "@/components/ClientRequestForm.module.css";

export default async function Page() {
  const session=await verifyCustomerSession((await cookies()).get(SESSION_COOKIE)?.value);
  if(!session?.email) redirect("/customer/login?next=/customer/partner");
  const rows=await sql`select r.id, assignments.project_id, assignments.partner_brief
    from partner_access access join customers c on c.id=access.account_id
    join consultations r on r.id=access.application_id and r.status='APPROVED'
    left join partner_assignments assignments on assignments.application_id=access.application_id
    where lower(c.email)=lower(${session.email}) order by assignments.project_id`;
  return <main className={styles.section}><h1>Partner portal</h1>
    {rows.length ? <><h2>Assigned work</h2>{rows.some(r=>r.project_id) ? rows.filter(r=>r.project_id).map(r=><article key={r.id+r.project_id}><strong>{r.project_id}</strong><p>{r.partner_brief}</p></article>) : <p>No projects assigned yet.</p>}</>
      : <><p>An approved partner receives an activation code at the application email address.</p><PartnerControls/></>}
    <a href="/customer/dashboard">Customer dashboard</a>
  </main>;
}
