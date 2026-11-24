"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestDelivery({ id, staff, visitor }) {
  const [status,setStatus]=useState("");
  const router=useRouter();
  async function retry() {
    setStatus("Sending…");
    try {
      const res=await fetch("/api/admin/enquiries/"+id+"/notify",{method:"POST"});
      setStatus(res.ok?"Sent.":"Check mail configuration and retry.");
      router.refresh();
    } catch {setStatus("Delivery unavailable.");}
  }
  return <div>Staff email {staff?"sent":"pending"} · Visitor email {visitor?"sent":"pending"}
    {(!staff || !visitor) && <button disabled={status==="Sending…"} onClick={retry}>Retry pending emails</button>}
    <p role="status">{status}</p>
  </div>;
}
