"use client";

import { useState } from "react";
import { propertyTypes } from "@/lib/propertyDetails";

export default function PropertyPublication({id,publication}) {
  const [published,setPublished]=useState(Boolean(publication?.published));
  const [status,setStatus]=useState("");
  const [busy,setBusy]=useState(false);
  async function save(event) {
    event.preventDefault();
    if(busy) return;
    const publish=event.nativeEvent.submitter?.value==="publish";
    const data=Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    try {
      const res=await fetch("/api/admin/enquiries/"+id+"/publication",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,published:publish})});
      if(!res.ok) throw new Error();
      setPublished(publish);setStatus(publish?"Published to the catalogue.":"Removed from the public catalogue.");
    } catch {setStatus("Could not save this publication.");} finally {setBusy(false);}
  }
  return <details><summary>{published?"Edit published listing":"Prepare public listing"}</summary>
    <form onSubmit={save}>
      <p>Enter the approved public copy. Owner contact details and PDFs stay private.</p>
      <label>Region <select name="region" defaultValue={publication?.region}><option value="ch">Switzerland</option><option value="do">Punta Cana</option></select></label>
      <label>Offer <select name="offer" defaultValue={publication?.offer}><option value="sale">Sale</option><option value="rent">Rent</option></select></label>
      {["title","location","details","price"].map(key=><label key={key}>{key} <input name={key} required maxLength={300} defaultValue={publication?.[key] || ""}/></label>)}
      <label>Property type <select name="propertyType" defaultValue={publication?.extra?.propertyType || ""}><option value="">Not specified</option>{propertyTypes.map(type=><option key={type}>{type}</option>)}</select></label>
      <label>Description <textarea name="description" maxLength={6000} rows={6} defaultValue={publication?.extra?.description || ""}/></label>
      {["amount","rooms","area"].map(key=><label key={key}>{key} (optional) <input name={key} type="number" min="0.01" step="any" defaultValue={publication?.extra?.[key] ?? ""}/></label>)}
      <label>Currency <select name="currency" defaultValue={publication?.extra?.currency || "CHF"}>{["CHF","USD","EUR"].map(value=><option key={value}>{value}</option>)}</select></label>
      <label>Status <input name="status" maxLength={120} defaultValue={publication?.extra?.status || ""}/></label>
      <label>Development stage <input name="development" maxLength={300} defaultValue={publication?.extra?.development || ""}/></label>
      {["gallery","documents"].map(key=><label key={key}>Approved public {key} — HTTPS URLs, one per line (maximum 12)<textarea name={key} maxLength={10000} defaultValue={publication?.extra?.[key]?.join("\n") || ""}/></label>)}
      <p>Only add images and documents approved for public viewing. Do not include private owner documents or contact details.</p>
      <label><input type="checkbox" name="publishPhoto" defaultChecked={Boolean(publication?.hasPhoto)} /> I have approval to publish the uploaded property photo.</label>
      <button disabled={busy} value="publish">Publish approved details</button>
      {published && <button disabled={busy} formNoValidate value="withdraw">Withdraw listing</button>}
      <p role="status">{status}</p>
    </form>
  </details>;
}
