import RequestDelivery from "@/components/admin/RequestDelivery";
import PartnerControls from "@/components/admin/PartnerControls";
import PropertyPublication from "@/components/admin/PropertyPublication";
import AdminShell from "@/components/admin/AdminShell";
import AdminStatusSelect from "@/components/admin/AdminStatusSelect";
import { getAdminEnquiries } from "@/lib/adminStore";
import { getCurrentAdmin } from "@/lib/currentAdmin";
import styles from "@/components/admin/Admin.module.css";

export const metadata = {
  title: "Admin Enquiries | Amigos Maler",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const admin = await getCurrentAdmin();
  const enquiries = await getAdminEnquiries();

  return (
    <AdminShell activePath="/admin/enquiries" admin={admin} eyebrow="Requests" title="Enquiries">
      <section className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div>
            <h2>Customer Requests</h2>
            <p>Every contact form submission and consultation request.</p>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Project</th>
              <th>Message</th>
              <th>Created</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td>{enquiry.customerName || enquiry.name}</td>
                <td>{enquiry.email}</td>
                <td>{enquiry.projectType}</td>
                <td className={styles.messageCell}>{enquiry.message}{enquiry.metadata?.publicRequest && <RequestDelivery id={enquiry.id} staff={enquiry.metadata.staffSent} visitor={enquiry.metadata.visitorSent}/>} {enquiry.projectType === "Partner application" && enquiry.status === "APPROVED" && <PartnerControls id={enquiry.id} />}{enquiry.projectType === "Property listing" && <PropertyPublication id={enquiry.id} publication={enquiry.publication} />}{enquiry.hasAttachment && <p><a href={`/api/admin/enquiries/${enquiry.id}/attachment`}>Download attachment</a></p>}</td>
                <td>{enquiry.created}</td>
                <td>
                  <AdminStatusSelect
                    endpoint={`/api/admin/enquiries/${enquiry.id}`}
                    options={enquiry.projectType === "Partner application" ? ["PENDING", "REVIEWING", "APPROVED", "DECLINED"] : ["PENDING", "REVIEWING", "SCHEDULED", "COMPLETED", "CANCELLED"]}
                    value={enquiry.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminShell>
  );
}
