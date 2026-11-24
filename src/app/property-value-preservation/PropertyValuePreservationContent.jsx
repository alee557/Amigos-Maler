"use client";

import { useState } from "react";
import styles from "./PropertyValuePreservation.module.css";

function Arrow() {
  return <span className={styles.arrowCircle} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" /></svg></span>;
}

function LineIcon({ type }) {
  const paths = {
    inspect: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /><path d="M8 11h6M11 8v6" /></>,
    repair: <><path d="m14 5 5 5" /><path d="m13 6-7 7 5 5 7-7" /><path d="m5 18-3 3M17 2l5 5" /></>,
    care: <><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.45A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" /><path d="M9 12h6M12 9v6" /></>,
    value: <><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 5-7" /><path d="M15 6h4v4" /></>
  };

  return <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">{paths[type]}</svg>;
}

function ActionLink({ children, variant = "gradient", id, href = "#contact" }) {
  return <a id={id} className={`${styles.action} ${styles[variant]}`} href={href}><Arrow />{children}</a>;
}

function HeroSection() {
  return (
    <section className={`${styles.hero} ${styles.section}`} data-hero>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>IMMOBILIENPFLEGE</p>
        <h1>Werterhalt <span>für Ihr Zuhause.</span></h1>
        <p className={styles.lead}>Schön. Gepflegt. Langfristig wertvoll. Regelmässige Kontrollen, professionelle Ausbesserungen und individuelle Betreuung für Hausbesitzer und Eigentümer.</p>
        <ActionLink>Jetzt Paket entdecken</ActionLink>
      </div>
      <img className={styles.imagePlaceholder} src="/assets/property-value-home.webp" alt="Gepflegtes, hochwertiges Wohnhaus" />
    </section>
  );
}

const approachItems = [
  ["inspect", "Kontrollieren", "Zustände früh erkennen."],
  ["repair", "Ausbessern", "Mängel gezielt beheben."],
  ["care", "Pflegen", "Oberflächen dauerhaft schützen."],
  ["value", "Werterhalten", "Werte langfristig sichern."]
];

function ApproachSection() {
  return (
    <section className={`${styles.approach} ${styles.section}`}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>UNSER ANSATZ</p>
        <h2>Kleine Massnahmen. Grosser Werterhalt.</h2>
      </div>
      <div className={styles.approachGrid}>
        {approachItems.map(([icon, title, text]) => (
          <article className={styles.approachItem} key={title}>
            <LineIcon type={icon} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const propertyAreas = [
  ["Facade", "We look at visible weathering, cracks, coatings and surface condition to identify areas that may require maintenance or renovation.", "facade"],
  ["Windows & Woodwork", "Painted woodwork and exposed elements are checked for wear, moisture exposure and deteriorating protective coatings.", "windows"],
  ["Interior Spaces", "Interior rooms are considered in relation to use, condition, light, surfaces and future renovation requirements.", "interior"],
  ["Walls & Ceilings", "Walls and ceilings are reviewed for cracks, surface damage, unevenness and preparation requirements.", "walls"],
  ["Surfaces", "The appropriate preparation, material and coating system depends on the specific surface and its intended use.", "surfaces"]
];

function PropertyCheckSection() {
  const [activeArea, setActiveArea] = useState(0);
  const [title, text, key] = propertyAreas[activeArea];

  return (
    <section className={`${styles.propertyCheck} ${styles.section}`}>
      <div className={styles.checkHeader}>
        <div><p className={styles.checkEyebrow}>PROPERTY CHECK</p><h2>Look closer. Maintain smarter.</h2></div>
        <p>Different parts of a property require different forms of attention. Explore the areas we can assess and maintain.</p>
      </div>
      <div className={styles.checkStage}>
        <div className={styles.checkImage}>
          <img src="/assets/external/property-value-preservation/photo-1600585154340-be6161a56a0c-w1400-q85.webp" alt="Contemporary property for inspection and maintenance" />
          {propertyAreas.map(([area, , areaKey], index) => <button key={area} type="button" className={`${styles.hotspot} ${styles[`hotspot${areaKey}`]} ${index === activeArea ? styles.hotspotActive : ""}`} onClick={() => setActiveArea(index)}><span />{area}</button>)}
        </div>
        <div className={styles.mobileAreas} aria-label="Property areas">
          {propertyAreas.map(([area], index) => <button key={area} type="button" className={index === activeArea ? styles.mobileAreaActive : ""} onClick={() => setActiveArea(index)}><span />{area}</button>)}
        </div>
        <aside className={styles.checkInfo}>
          <div className={styles.checkTop}><span>SELECT AN AREA</span><span>0{activeArea + 1} / 05</span></div>
          <div className={styles.checkCopy}><small>0{activeArea + 1} / 05</small><h3 id="propertyAreaHeading">{title}</h3><p>{text}</p></div>
        </aside>
      </div>
    </section>
  );
}

const audienceItems = [
  ["PRIVATE OWNERS", "Owners", "Long-term maintenance, renovation and preservation of your property.", "/assets/external/property-value-preservation/photo-1600585154340-be6161a56a0c-w1400-q85.webp"],
  ["PROPERTY MANAGEMENT", "Property Managers", "Reliable maintenance, tenant changes, renovations and coordinated projects.", "/assets/external/property-value-preservation/photo-1486406146926-c627a92ad1ab-w1400-q85.webp"],
  ["PROPERTY INVESTMENT", "Investors", "Maintain the condition and presentation of investment properties over time.", "/assets/external/property-value-preservation/photo-1560518883-ce09059eeffa-w1400-q85.webp"]
];

function AudienceSection() {
  return (
    <section className={`${styles.audience} ${styles.section}`}>
      <div className={styles.audienceHeader}>
        <p className={styles.eyebrow}>FOR WHOM</p>
        <h2>Property care for different<br />perspectives.</h2>
      </div>
      <div className={styles.audienceGrid}>
        {audienceItems.map(([label, title, text, image], index) => (
          <article className={styles.audienceCard} key={title}>
            <img src={image} alt={`${title} property care`} />
            <span className={styles.audienceNumber}>0{index + 1}</span>
            <div className={styles.audienceOverlay} />
            <div className={styles.audienceContent}>
              <span>{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const homePlans = [
  { id: "home-basic", title: "BASIC HOME CARE", price: "CHF 89 / Monat", actionId: "propertyPlanBasicAction", features: ["Jährliche Objektkontrolle", "Kleine Ausbesserungen", "Priorisierte Empfehlungen", "Persönliche Dokumentation"] },
  { id: "home-plus", title: "PLUS HOME CARE", badge: "BELIEBT", price: "CHF 199 / Monat", featured: true, features: ["Halbjährliche Objektkontrolle", "Kleine Ausbesserungen inklusive", "Saisonale Pflegearbeiten", "Priorisierte Empfehlungen", "Persönliche Betreuung"] },
  { id: "home-premium", title: "PREMIUM HOME CARE", price: "CHF 399 / Monat", actionId: "propertyPlanPremiumAction", features: ["Monatliche Objektkontrolle", "Ausbesserungen und Pflege", "Früherkennung von Schäden", "Individueller Unterhaltsplan", "Direkte Ansprechpartner"] }
];

function PlanCard({ plan }) {
  return (
    <article id={plan.id} className={`${styles.planCard} ${plan.featured ? styles.featured : ""}`} style={{ background: "#ffffff", color: "#071a33" }}>
      {plan.badge && <span className={styles.badge}>{plan.badge}</span>}
      <p className={styles.cardKicker} style={{ color: "#e62453", WebkitTextFillColor: "#e62453", fontWeight: 800 }}>{plan.title}</p>
      <ul>{plan.features.map((feature) => <li key={feature} style={{ color: "#071a33", WebkitTextFillColor: "#071a33" }}>{feature}</li>)}</ul>
      <strong className={styles.price} style={{ color: "#071a33", WebkitTextFillColor: "#071a33", fontWeight: 900 }}>{plan.price}</strong>
      <ActionLink id={plan.actionId} href={`/contact?care=${plan.id}#contact-form`} variant={plan.featured ? "gradient" : "outline"}>{plan.featured ? "Paket auswählen" : "Mehr erfahren"}</ActionLink>
    </article>
  );
}

export function HomeCarePricing({ embedded = false }) {
  const section = (
    <section className={`${styles.pricingSection} ${styles.section}`} id="plans">
      <div className={styles.pricingHeader}>
        <div><p className={styles.eyebrow}>HOME CARE</p><h2><span>Für Ihr Zuhause.</span></h2></div>
        <p>Unsere Home Care Pakete bieten Ihnen die richtige Lösung – abgestimmt auf Ihre Immobilie und Ihre Bedürfnisse. Drei Pakete. Ein Ziel: Langfristiger Werterhalt.</p>
      </div>
      <div className={styles.planGrid}>{homePlans.map((plan) => <PlanCard key={plan.title} plan={plan} />)}</div>
    </section>
  );
  return embedded ? <div className={styles.page}>{section}</div> : section;
}

const businessPlans = [
  { id: "business-flex", title: "BUSINESS FLEX", subtitle: "Einzelaufträge", price: "ab CHF 120 / Std.", note: "zzgl. Material und Anfahrt", features: ["Flexible Einzelaufträge", "Klare Aufwandsschätzung", "Professionelle Ausführung", "Persönliche Koordination"] },
  { id: "business-partner", title: "BUSINESS PARTNER", subtitle: "Halbjährliche Betreuung", price: "ab CHF 199 / Monat", note: "oder CHF 2388 / Jahr", featured: true, features: ["Halbjährliche Kontrollen", "Planbare Unterhaltsarbeiten", "Priorisierte Terminplanung", "Dokumentierte Empfehlungen", "Direkter Ansprechpartner"] }
];

function BusinessCarePricing() {
  return (
    <section id="business-care" className={`${styles.business} ${styles.section}`}>
      <div className={styles.businessHeader}>
        <p className={styles.eyebrow}>BUSINESS CARE</p>
        <h2>Professionelle Unterhaltlösungen <span>für Verwaltungen.</span></h2>
        <p>Planbar. Effizient. Langfristig wirtschaftlich.</p>
      </div>
      <div className={styles.businessGrid}>
        {businessPlans.map((plan) => (
          <article id={plan.id} className={`${styles.businessCard} ${plan.featured ? styles.businessFeatured : ""}`} key={plan.title}>
            <p className={styles.cardKicker}>{plan.title}</p>
            <p className={styles.cardSubtitle}>{plan.subtitle}</p>
            <strong className={styles.price}>{plan.price}</strong>
            <p className={styles.cardNote}>{plan.note}</p>
            <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <ActionLink href={`/contact?care=${plan.id}#contact-form`} variant={plan.featured ? "gradient" : "outline"}>{plan.featured ? "Partner werden" : "Auftrag anfragen"}</ActionLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className={`${styles.finalCta} ${styles.section}`} id="contact">
      <div className={styles.finalCtaBgWrapper} aria-hidden="true">
        <img
          src="/assets/property-value-final-cta.webp"
          alt=""
          className={styles.finalCtaBgImg}
        />
        <div className={styles.finalCtaOverlay} />
      </div>
      <div className={styles.finalCopy}>
        <p className={styles.finalKicker}>AMIGOS MALER GMBH · OLTEN · SWITZERLAND</p>
        <h2>Your property deserves a<br />solution that lasts.</h2>
        <p>Whether it is maintenance, renovation, facade work or long-term property value preservation — we provide personal advice and develop the right approach for your property.</p>
        <div className={styles.finalActions}>
          <ActionLink>Discuss Property Value</ActionLink>
          <ActionLink>Request a Free Consultation</ActionLink>
        </div>
        <div className={styles.finalMeta}><span>AMIGOS MALER GMBH</span><span>OLTEN · SWITZERLAND</span><span>PROPERTY VALUE PRESERVATION</span></div>
      </div>
    </section>
  );
}

export default function PropertyValuePreservationContent() {
  return (
    <main className={`${styles.page} property-page`}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Light mode header controls for property-value-preservation */
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header #headerCustomerLoginBtn,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header #headerCustomerLoginBtn *,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header #headerCustomerLoginIcon,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header #headerCustomerLoginIcon *,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header #headerQuoteBtn,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header #headerQuoteBtn *,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header .header-actions .customer-header-btn,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header .header-actions .header-btn,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header .header-actions .customer-header-btn *,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header .header-actions .header-btn *,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header #headerCustomerLoginBtn,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header #headerCustomerLoginBtn *,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header #headerCustomerLoginIcon,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header #headerCustomerLoginIcon *,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header #headerQuoteBtn,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header #headerQuoteBtn *,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header .header-actions .customer-header-btn,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header .header-actions .header-btn,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header .header-actions .customer-header-btn *,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header .header-actions .header-btn *,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader #headerCustomerLoginBtn,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader #headerCustomerLoginBtn *,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader #headerCustomerLoginIcon,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader #headerCustomerLoginIcon *,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader #headerQuoteBtn,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader #headerQuoteBtn *,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader .header-actions .customer-header-btn,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader .header-actions .header-btn,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader .header-actions .customer-header-btn *,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader .header-actions .header-btn *,
        html[data-theme="amigos-light"] body:has(.property-page) #siteHeader .header-actions .customer-header-btn,
        html[data-theme="amigos-light"] body:has(.property-page) #siteHeader .header-actions .header-btn,
        html[data-theme="amigos-light"] body:has(.property-page) #siteHeader .header-actions .customer-header-btn *,
        html[data-theme="amigos-light"] body:has(.property-page) #siteHeader .header-actions .header-btn * {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          stroke: #000000 !important;
        }

        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header #headerDisplaySettings,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header #headerDisplaySettings,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader #headerDisplaySettings,
        html[data-theme="amigos-light"] body:has(.property-page) #siteHeader #headerDisplaySettings {
          color: #000000 !important;
          border-color: rgba(0, 0, 0, 0.25) !important;
        }

        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header #headerDisplaySettings span,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header #headerDisplaySettings span,
        html:not([data-theme="amigos-dark"]) body:has(.property-page) #siteHeader #headerDisplaySettings span,
        html[data-theme="amigos-light"] body:has(.property-page) #siteHeader #headerDisplaySettings span {
          background: #000000 !important;
          background-color: #000000 !important;
        }

        html:not([data-theme="amigos-dark"]) body #siteHeader .servicesToggle,
        html:not([data-theme="amigos-dark"]) body #siteHeader .servicesToggle svg,
        html:not([data-theme="amigos-dark"]) body #siteHeader .sectionMenu > button,
        html:not([data-theme="amigos-dark"]) body #siteHeader .sectionMenu > button svg,
        html:not([data-theme="amigos-dark"]) body #siteHeader [class*="navChevron"],
        html:not([data-theme="amigos-dark"]) body #siteHeader [class*="navChevron"] path,
        html[data-theme="amigos-light"] body #siteHeader .servicesToggle,
        html[data-theme="amigos-light"] body #siteHeader .servicesToggle svg,
        html[data-theme="amigos-light"] body #siteHeader .sectionMenu > button,
        html[data-theme="amigos-light"] body #siteHeader .sectionMenu > button svg,
        html[data-theme="amigos-light"] body #siteHeader [class*="navChevron"],
        html[data-theme="amigos-light"] body #siteHeader [class*="navChevron"] path {
          color: #000000 !important;
          stroke: #000000 !important;
        }

        #siteHeader .site-nav {
          gap: clamp(14px, 1.4vw, 22px) !important;
        }
        #siteHeader .servicesToggle,
        #siteHeader .sectionMenu button,
        #siteHeader [class*="servicesToggle"],
        #siteHeader [class*="sectionMenu"] > button {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 10px !important;
          min-width: 10px !important;
          height: 14px !important;
          margin: 0 0 0 4px !important;
          padding: 0 !important;
        }
        #siteHeader [class*="navChevron"] {
          width: 10px !important;
          height: 6px !important;
        }

        /* Guaranteed section background contrast in both dark and light modes */
        html body:has(.property-page) main.property-page > section[class*="approach"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="approach"],
        html:not([data-theme="amigos-dark"]) body:has(.property-page) main.property-page > section[class*="approach"] {
          background: #ffffff !important;
          color: #071a33 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="approach"] h2,
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="approach"] h2 {
          color: #071a33 !important;
          -webkit-text-fill-color: #071a33 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="approach"] p[class*="eyebrow"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="approach"] p[class*="eyebrow"] {
          color: #d97706 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="approach"] h3,
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="approach"] h3 {
          color: #071a33 !important;
          -webkit-text-fill-color: #071a33 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="approach"] p:not([class*="eyebrow"]),
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="approach"] p:not([class*="eyebrow"]) {
          color: #4b5563 !important;
          -webkit-text-fill-color: #4b5563 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="approach"] article[class*="approachItem"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="approach"] article[class*="approachItem"] {
          background: #ffffff !important;
          border-color: rgba(7, 26, 51, 0.12) !important;
        }

        html body:has(.property-page) main.property-page > section[class*="propertyCheck"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="propertyCheck"],
        html:not([data-theme="amigos-dark"]) body:has(.property-page) main.property-page > section[class*="propertyCheck"] {
          background: linear-gradient(120deg, #ffd15a 0%, #ff9b2d 48%, #f36f22 100%) !important;
          color: #071a33 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="propertyCheck"] h2,
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="propertyCheck"] h2 {
          color: #071a33 !important;
          -webkit-text-fill-color: #071a33 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="propertyCheck"] p[class*="checkEyebrow"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="propertyCheck"] p[class*="checkEyebrow"] {
          color: #071a33 !important;
          -webkit-text-fill-color: #071a33 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="propertyCheck"] div[class*="checkHeader"] > p,
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="propertyCheck"] div[class*="checkHeader"] > p {
          color: #1a273b !important;
          -webkit-text-fill-color: #1a273b !important;
        }

        html body:has(.property-page) main.property-page > section[class*="audience"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="audience"],
        html:not([data-theme="amigos-dark"]) body:has(.property-page) main.property-page > section[class*="audience"] {
          background: #f8fafc !important;
          color: #071a33 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="audience"] h2,
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="audience"] h2 {
          color: #071a33 !important;
          -webkit-text-fill-color: #071a33 !important;
        }
        html body:has(.property-page) main.property-page > section[class*="audience"] p[class*="eyebrow"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="audience"] p[class*="eyebrow"] {
          color: #d97706 !important;
        }

        html body:has(.property-page) main.property-page > section[class*="pricingSection"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="pricingSection"],
        html:not([data-theme="amigos-dark"]) body:has(.property-page) main.property-page > section[class*="pricingSection"] {
          background: linear-gradient(135deg, #071a33 0%, #102d4c 55%, #24172e 100%) !important;
          color: #ffffff !important;
        }

        /* Plan cards on #plans are clean white cards: enforce dark ink text on white in all themes */
        #plans article,
        article[class*="planCard"],
        html body:has(.property-page) #plans article[class*="planCard"],
        html[data-theme] #plans article,
        html[data-theme] article[class*="planCard"] {
          background: #ffffff !important;
          color: #071a33 !important;
        }

        #plans article [class*="cardKicker"],
        article[class*="planCard"] [class*="cardKicker"],
        html body:has(.property-page) #plans article[class*="planCard"] [class*="cardKicker"],
        html[data-theme] #plans article [class*="cardKicker"],
        html[data-theme] article[class*="planCard"] [class*="cardKicker"] {
          color: #e62453 !important;
          -webkit-text-fill-color: #e62453 !important;
          font-weight: 900 !important;
        }

        #plans article ul li,
        article[class*="planCard"] ul li,
        html body:has(.property-page) #plans article[class*="planCard"] ul li,
        html[data-theme] #plans article ul li,
        html[data-theme] article[class*="planCard"] ul li {
          color: #071a33 !important;
          -webkit-text-fill-color: #071a33 !important;
          font-weight: 500 !important;
        }

        #plans article strong,
        article[class*="planCard"] strong,
        html body:has(.property-page) #plans article[class*="planCard"] strong,
        html[data-theme] #plans article strong,
        html[data-theme] article[class*="planCard"] strong {
          color: #071a33 !important;
          -webkit-text-fill-color: #071a33 !important;
          font-weight: 900 !important;
        }

        #plans article a[class*="outline"],
        article[class*="planCard"] a[class*="outline"],
        html body:has(.property-page) #plans article[class*="planCard"] a[class*="outline"],
        html[data-theme] #plans article a[class*="outline"] {
          color: #071a33 !important;
          -webkit-text-fill-color: #071a33 !important;
          border-color: rgba(246, 190, 16, 0.78) !important;
        }

        #plans article a[class*="outline"] span,
        article[class*="planCard"] a[class*="outline"] span,
        html body:has(.property-page) #plans article[class*="planCard"] a[class*="outline"] span,
        html[data-theme] #plans article a[class*="outline"] span {
          color: #071a33 !important;
          -webkit-text-fill-color: #071a33 !important;
        }

        html body:has(.property-page) #plans article a[class*="outline"]:hover {
          background: #f6be10 !important;
          background-image: none !important;
          border-color: #f6be10 !important;
          box-shadow: none !important;
          transform: none !important;
        }
        #plans article a[class*="outline"] [class*="arrowCircle"],
        article[class*="planCard"] a[class*="outline"] [class*="arrowCircle"],
        html body:has(.property-page) #plans article[class*="planCard"] a[class*="outline"] [class*="arrowCircle"],
        html[data-theme] #plans article a[class*="outline"] [class*="arrowCircle"] {
          background: #ffffff !important;
          border: 1px solid rgba(246, 190, 16, 0.78) !important;
        }

        #plans article a[class*="outline"] svg path,
        article[class*="planCard"] a[class*="outline"] svg path,
        html body:has(.property-page) #plans article[class*="planCard"] a[class*="outline"] svg path,
        html[data-theme] #plans article a[class*="outline"] svg path {
          stroke: #071a33 !important;
        }

        #plans article a[class*="gradient"] span,
        article[class*="planCard"] a[class*="gradient"] span,
        html body:has(.property-page) #plans article[class*="planCard"] a[class*="gradient"] span,
        html[data-theme] #plans article a[class*="gradient"] span {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }
        html body:has(.property-page) main.property-page > section[class*="business"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="business"],
        html:not([data-theme="amigos-dark"]) body:has(.property-page) main.property-page > section[class*="business"] {
          background: linear-gradient(180deg, #081c36 0%, #07162b 100%) !important;
          color: #ffffff !important;
        }

        /* Final CTA styles with guaranteed architectural villa background */
        section[class*="finalCta"],
        #contact.finalCta,
        html body:has(.property-page) main.property-page > section[class*="finalCta"],
        html[data-theme="amigos-dark"] body:has(.property-page) main.property-page > section[class*="finalCta"],
        html:not([data-theme="amigos-dark"]) body:has(.property-page) main.property-page > section[class*="finalCta"] {
          position: relative !important;
          min-height: 520px !important;
          overflow: hidden !important;
          background: linear-gradient(180deg, rgba(7, 26, 51, 0.42) 0%, rgba(7, 26, 51, 0.68) 100%), url('/assets/property-value-final-cta.webp') center center / cover no-repeat !important;
          color: #ffffff !important;
        }
      ` }} />
      <HeroSection />
      <ApproachSection />
      <PropertyCheckSection />
      <AudienceSection />
      <HomeCarePricing />
      <BusinessCarePricing />
      <FinalCTA />
    </main>
  );
}
