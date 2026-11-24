"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { requestFields } from "@/lib/requestFields";
import styles from "./ClientRequestForm.module.css";

export default function ClientRequestForm({ kind, id, heading, detail = "", makeAttachment }) {
  const { t, locale } = useLanguage();
  const isPartnerApplication = kind === "Partner application";
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [reference, setReference] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("source",window.location.pathname);
    data.set("locale",document.documentElement.lang);
    data.set("projectType", kind);
    data.set("locale", locale);
    if (detail) data.set("message", detail + "\n" + data.get("message"));
    setBusy(true);
    setNotice("");
    setReference("");
    try {
      if (makeAttachment) {
        const file = await makeAttachment();
        if (!file) throw new Error("Choose a finish and mark the wall first.");
        data.set("upload", file, "visualizer.jpg");
      }
      if (data.get("upload")?.size > 3 * 1024 * 1024) throw new Error("Choose a JPEG, PNG or PDF up to 3 MB.");
      const response = await fetch("/api/consultations", { method: "POST", body: data });
      if (!response.ok) throw new Error(response.status === 415 ? "Choose a JPEG, PNG or PDF up to 3 MB." : "Unable to send your enquiry right now.");
      const result = await response.json();
      setReference(result.consultation.id);
      form.reset();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy(false);
    }
  }
  return <section className={`${styles.section}${isPartnerApplication ? ` ${styles.partnerSection}` : ""}`} id={id} data-i18n-skip>
    {isPartnerApplication ? <div className={styles.partnerHeader}>
      <div>
        <p className={styles.partnerEyebrow}>{t("Partner application")}</p>
        <h2>{t(heading)}</h2>
        <p className={styles.partnerLead}>{t("Tell us about your company, expertise and service area. We will review your application and contact you personally.")}</p>
      </div>
      <a className={styles.partnerLogin} href="/customer/partner"><span>{t("Already a partner?")}</span>{t("Partner login")} <b aria-hidden="true">→</b></a>
    </div> : <h2>{t(heading)}</h2>}
    <form onSubmit={submit} className={`${styles.form}${isPartnerApplication ? ` ${styles.partnerForm}` : ""}`}>
      {(requestFields[kind] || []).map(({name,label,options,optional,type}) => type === "checkbox"
        ? <label className={styles.checkboxLabel} key={name}><input name={name} type="checkbox" required={!optional}/><span>{t(label)}</span></label>
        : <label key={name}>{t(label)}
          {options ? <select name={name} defaultValue="" required><option value="" disabled>{t("Please select")}</option>{options.map(value => <option key={value} value={value}>{t(value)}</option>)}</select>
            : <input name={name} type={type || "text"} required={!optional} maxLength={150}/>}
        </label>)}
      {isPartnerApplication && <a className={styles.privacyLink} href="/datenschutz" target="_blank" rel="noopener noreferrer">{t("View privacy policy")} <span aria-hidden="true">↗</span></a>}
      <label>{t("Name")}<input name="name" minLength={2} maxLength={120} autoComplete="name" required /></label>
      <label>{t("Email")}<input name="email" type="email" autoComplete="email" required /></label>
      <label>{t("Phone")}<input name="phone" type="tel" autoComplete="tel" /></label>
      <label>{t("Description")}<textarea name="message" rows={4} minLength={10} maxLength={1400} required /></label>
      {!makeAttachment && <label>{t("Optional photo or document")} · JPEG, PNG, PDF (3 MB)<input type="file" name="upload" accept="image/jpeg,image/png,application/pdf"/></label>}
      <button disabled={busy}>{t(busy ? "Sending your enquiry…" : heading)}</button>
      {reference && <p role="status">{t("Request received. Your reference")} <strong>{reference}</strong></p>}
      {notice && <p role="alert">{t(notice)}</p>}
    </form>
  </section>;
}
