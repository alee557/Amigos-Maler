"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function OwnerListingForm() {
  const purpose=useRef(null);
  useEffect(()=>{
    const intent=new URLSearchParams(window.location.search).get("purpose");
    if(["Sell","Rent"].includes(intent)) purpose.current.value=intent;
  },[]);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const { t } = useLanguage();
  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("upload")?.size > 3 * 1024 * 1024) {
      setStatus("Choose a JPEG, PNG or PDF up to 3 MB.");
      return;
    }
    data.set("source",window.location.pathname);
    data.set("locale",document.documentElement.lang);
    data.set("projectType", "Property listing");
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/consultations", { method: "POST", body: data });
      if (!response.ok) {
        setStatus([413,415].includes(response.status) ? "Choose a JPEG, PNG or PDF up to 3 MB." : "Unable to send your enquiry right now.");
        return;
      }
      form.reset();
      setStatus("Your listing request has been received for review.");
    } catch {
      setStatus("Unable to send your enquiry right now.");
    } finally {
      setSending(false);
    }
  }
  return (
      <form className="partner-listing-form" onSubmit={submit} onChange={() => setStatus("")}>
        <h3>Listing Request</h3>
        <p className="partner-form-intro">Tell us a little about the property and we will take it from there.</p>
        <div className="partner-form-grid">
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
          <label>Object Type<select name="propertyType" required defaultValue=""><option value="" disabled>Select type</option><option value="House">House</option><option value="Apartment">Apartment</option><option value="Commercial property">Commercial property</option></select></label>
          <label>Purpose<select ref={purpose} name="purpose" required defaultValue=""><option value="" disabled>Select purpose</option><option value="Sell">Sell</option><option value="Rent">Rent</option></select></label>
          <label>Region<input name="region" required maxLength={120} placeholder="Region / town" /></label>
          <label className="partner-form-wide">Description<textarea name="message" required minLength={10} maxLength={1650} placeholder="Short property description" /></label>
          <label className="partner-form-upload">JPEG, PNG, PDF (max. 3 MB)<input name="upload" type="file" accept="image/jpeg,image/png,application/pdf" /></label>
        </div>
        <label className="partner-check"><input type="checkbox" name="updates" /> I would like to hear about new projects.</label>
        <label className="partner-check"><input type="checkbox" name="longTerm" /> I am interested in a long-term partnership.</label>
        <button id="partnersSendRequestButton" className="partners-btn partners-btn-primary" type="submit" disabled={sending}>Send Request</button>
        {status && <p role="status">{t(status)}</p>}
      </form>
  );
}
