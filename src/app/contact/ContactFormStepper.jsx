"use client";

import { swissToday, validConsultationPreference } from "@/lib/workDates";
import ExecutionDate from "@/components/ExecutionDate";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./ContactPage.module.css";

function Icon({ name }) {
  const icons = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    facade: <><path d="M4 20V7l8-4 8 4v13" /><path d="M8 20v-6h8v6M8 9h.01M12 9h.01M16 9h.01" /></>,
    wallpaper: <><path d="M5 4h14v16H5zM9 4v16M15 4v16" /><path d="M7 8h.01M11 12h.01M17 9h.01M8 16h.01" /></>,
    plaster: <><path d="m4 18 4-4 4-7 3 1-3 7-6 5Z" /><path d="m13 6 3-3 3 3-3 3Z" /></>,
    property: <><path d="M4 20V6l8-3 8 3v14M8 20v-5h8v5M8 9h.01M12 9h.01M16 9h.01" /></>,
    enquiry: <><path d="M4 5h16v11H8l-4 4V5Z" /><circle cx="9" cy="10.5" r=".7" fill="currentColor" /><circle cx="12" cy="10.5" r=".7" fill="currentColor" /><circle cx="15" cy="10.5" r=".7" fill="currentColor" /></>,
  };
  return <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

const steps = [["Your Service", "What can we do for you?"], ["Location", "Where is your property?"], ["Contact Information", "How can we reach you?"]];
const services = [
  ["Interior Painting", "home", "/external/interior-painting/photo-1482731215275-a1f151646268-w1200-q80.webp", "Painting"],
  ["Facade Painting", "facade", "/assets/facade/Facade-maintain.webp", "Painting"],
  ["Wallpapering", "wallpaper", "/assets/wallpapers/wallpaper-1.webp", "Renovation"],
  ["Plastering & Drywall", "plaster", "/assets/drywall/plastering.webp", "Plastering"],
  ["Property Maintenance", "property", "/services-imags/property-value-hero.webp", "Property Preservation"],
  ["General Enquiry", "enquiry", "/external/projects/photo-1600210492486-724fe5c67fb0-w1800-q90.webp", "Other"],
];

export default function ContactFormStepper({ initialCarePackage = "" }) {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(initialCarePackage ? "Property Maintenance" : services[0][0]);
  const [carePackage, setCarePackage] = useState(initialCarePackage);
  const [preferredDay, setPreferredDay] = useState("");
  const [consultationDay, setConsultationDay] = useState("");
  const [consultationTime, setConsultationTime] = useState("");
  const [endDay,setEndDay] = useState("");
  const [execution, setExecution] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ location: "", name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");

  const updateField = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  const goToStep = (step) => {
    setSubmitted(false);
    setStatus("");
    setCurrentStep(Math.max(1, Math.min(step, 3)));
  };

  const isStepComplete = (step) => {
    if (step === 1) return Boolean(selectedService);
    if (step === 2) return Boolean(formData.location.trim()) && (execution || carePackage || validConsultationPreference(consultationDay, consultationTime));
    return Boolean(formData.name.trim() && /\S+@\S+\.\S+/.test(formData.email));
  };

  const handleNext = async () => {
    if (sending) return;
    if (!isStepComplete(currentStep)) {
      setStatus(t("Please complete this step before continuing."));
      return;
    }

    if (currentStep < 3) {
      setStatus("");
      setCurrentStep((step) => step + 1);
      return;
    }

    setSending(true);
    setStatus(t("Sending your enquiry…"));
    const payload = new FormData();
    payload.set("source",window.location.pathname);
    payload.set("locale",document.documentElement.lang);
    payload.set("name", formData.name);
    payload.set("email", formData.email);
    payload.set("phone", formData.phone);
    if (execution || carePackage) {
      payload.set("workDay", preferredDay);
      payload.set("workEnd", endDay);
      payload.set("requestPurpose", "Execution");
    }
    if (!execution && !carePackage) {
      payload.set("consultationDay", consultationDay);
      payload.set("consultationTime", consultationTime);
    }
    const service = services.find(([label]) => label === selectedService);
    payload.set("projectType", service[3]);
    payload.set("message", `Service: ${selectedService}\nLocation: ${formData.location}${carePackage ? `\nPackage: ${carePackage}` : ""}`);

    try {
      const response = await fetch("/api/consultations", { method: "POST", body: payload });
      if (response.status === 409) { setPreferredDay(""); setCurrentStep(2); throw new Error(t("This date is no longer available.")); }
      if (!response.ok) throw new Error(t("Unable to send your enquiry right now."));
      setSubmitted(true);
      setStatus("");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setEndDay("");
    setConsultationDay("");
    setConsultationTime("");
    setExecution(false);
    setPreferredDay("");
    setCarePackage("");
    setSelectedService(services[0][0]);
    setFormData({ location: "", name: "", email: "", phone: "" });
    setSubmitted(false);
    setStatus("");
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    if (submitted) {
      return <div className={styles.successState} role="status">
        <span className={styles.successIcon}>✓</span>
        <h2>{t("Thank you. We received your enquiry.")}</h2>
        <p className={styles.formIntro}>{t("Our team will review your details and get back to you personally.")}</p>
      </div>;
    }

    if (currentStep === 1) {
      return <>
        <h2>{t("What can we do for you?")}</h2>
        <p className={styles.formIntro}>{t("Select the service area where we can support you.")}</p>
        <div className={styles.serviceGrid}>{services.map(([label, icon, image]) => { const isSelected = selectedService === label; return <button className={`${styles.serviceCard} ${isSelected ? styles.selectedCard : ""}`} type="button" key={label} onClick={() => { setSelectedService(label); setCarePackage(label === "Property Maintenance" ? initialCarePackage : ""); }} style={{ "--service-image": `url("${image}")` }} aria-pressed={isSelected}>
          <span className={styles.serviceIcon}><Icon name={icon} /></span><span className={styles.serviceLabel}>{t(label)}</span><span className={styles.radio}>{isSelected ? "✓" : ""}</span>
        </button>; })}</div>
      </>;
    }

    if (currentStep === 2) {
      return <>
        <h2>{t("Where is your property?")}</h2>
        <p className={styles.formIntro}>{t("Tell us where the work will take place.")}</p>
        <label className={styles.field}><span>{t("Request type")}</span><select value={execution || carePackage ? "work" : "consultation"} disabled={Boolean(carePackage)} onChange={event=>setExecution(event.target.value==="work")}><option value="consultation">{t("Consultation")}</option><option value="work">{t("Execution or care start")}</option></select></label>
        {(execution || carePackage) && <ExecutionDate value={preferredDay} onChange={day=>{setPreferredDay(day);setEndDay("");}} endDay={endDay} setEndDay={setEndDay}/>}
        {!execution && !carePackage && <>
          <div className={styles.fieldGrid}>
            <label className={styles.field}><span>{t("Preferred consultation date (optional)")}</span><input type="date" min={swissToday()} value={consultationDay} onChange={e => setConsultationDay(e.target.value)} /></label>
            <label className={styles.field}><span>{t("Preferred consultation time")}</span><input type="time" value={consultationTime} onChange={e => setConsultationTime(e.target.value)} /></label>
          </div>
          <p className={styles.formIntro}>{t("Times are in Switzerland. Your appointment is confirmed personally by our team. Leave both fields empty to arrange a time together.")}</p>
        </>}
        <label className={styles.field}><span>{t("Property location")}</span><input value={formData.location} onChange={updateField("location")} placeholder={t("City, postcode or address")} /></label>
      </>;
    }

    return <>
      <h2>{t("How can we reach you?")}</h2>
      <p className={styles.formIntro}>{t("Leave your details and we will get back to you personally.")}</p>
      <div className={styles.fieldGrid}>
        <label className={styles.field}><span>{t("Name")}</span><input value={formData.name} onChange={updateField("name")} placeholder={t("Your name")} /></label>
        <label className={styles.field}><span>{t("E-Mail")}</span><input type="email" value={formData.email} onChange={updateField("email")} placeholder="you@example.com" /></label>
        <label className={styles.field}><span>{t("Phone")}</span><input type="tel" value={formData.phone} onChange={updateField("phone")} placeholder={t("Your phone number")} /></label>
      </div>
    </>;
  };

  return <section className={styles.formSection} id="contact-form">
    <div className={styles.formPanel}>
      <aside className={styles.stepper} aria-label={t("Contact form progress")}>
        <div className={styles.stepLine} />
        {steps.map(([title, description], index) => { const step = index + 1; return <button id={`contactStep${step}`} className={`${styles.step} ${step === currentStep ? styles.activeStep : ""} ${step < currentStep || isStepComplete(step) ? styles.completedStep : ""}`} type="button" disabled={sending || (step > 1 && !isStepComplete(step - 1))} onClick={() => goToStep(step)} key={title} aria-current={step === currentStep ? "step" : undefined}>
          <span className={styles.stepNumber}>{step}</span><div><strong>{t(title)}</strong><small>{t(description)}</small></div>
        </button>; })}
      </aside>
      <div className={styles.formContent}>
        <p className={styles.formKicker}>{t("STEP")} {currentStep} {t("OF")} 3</p>
        {carePackage && <p>{carePackage}</p>}
        {renderStepContent()}
        {status && <p className={styles.formStatus} role="alert">{status}</p>}
        <div className={styles.stepActions}>
          {!submitted && currentStep > 1 && <button id="contactFormBackButton" className={styles.backButton} type="button" disabled={sending} onClick={() => goToStep(currentStep - 1)}>{t("Back")}</button>}
          {submitted ? <button id="contactFormStartAgainButton" className={styles.nextButton} type="button" onClick={resetForm}>{t("Start Again")}</button> : <button id="contactFormNextButton" className={styles.nextButton} type="button" disabled={sending} onClick={handleNext}>{t(currentStep === 3 ? "Send Enquiry" : "Next Step")}</button>}
        </div>
      </div>
    </div>
  </section>;
}
