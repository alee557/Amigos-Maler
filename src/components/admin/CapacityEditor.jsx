"use client";

import { useState } from "react";
import { swissToday } from "@/lib/workDates";

export default function CapacityEditor() {
  const [status,setStatus] = useState("");
  async function save(event) {
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    setStatus("Saving…");
    try {
      const res=await fetch("/api/admin/capacity",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(data))});
      setStatus(res.ok?"Availability saved.":"Could not save availability.");
    } catch { setStatus("Could not save availability."); }
  }
  return <form onSubmit={save}>
    <h2>Execution dates</h2>
    <p>Publish a day for customers to request. Staff confirm each request separately.</p>
    <label>Day <input name="day" type="date" min={swissToday()} required/></label>{" "}
    <label>Capacity <select name="availability"><option value="available">Available</option><option value="limited">Limited</option><option value="unavailable">Unavailable</option></select></label>{" "}
    <button disabled={status==="Saving…"}>Save availability</button> <span role="status">{status}</span>
  </form>;
}
