"use client";

import { useEffect, useRef, useState } from "react";
import OwnerListingForm from "../partners/OwnerListingForm";
import styles from "./ProjectsContent.module.css";
import { swissToday } from "@/lib/workDates";
import { filterProperties, propertyTypes } from "@/lib/propertyDetails";

const properties = [
  { type: "sale", tag: "For Sale", title: "Modern villa with garden", location: "Olten, Switzerland", price: "CHF 1'280'000", details: "5.5 rooms · 168 m²", image: "/assets/optimized/projects/modern-villa.webp", sample: true, extra: { propertyType: "House", currency: "CHF", amount: 1280000 } },
  { type: "rent", tag: "For Rent", title: "Light-filled city apartment", location: "Aarau, Switzerland", price: "CHF 2'450 / month", details: "4.5 rooms · 112 m²", image: "/assets/optimized/projects/city-apartment.webp", sample: true, extra: { propertyType: "Apartment", currency: "CHF", amount: 2450 } },
  { type: "sale", tag: "For Sale", title: "Architect-designed family home", location: "Solothurn, Switzerland", price: "CHF 1'095'000", details: "6.5 rooms · 194 m²", image: "/assets/optimized/projects/family-home.webp", sample: true, extra: { propertyType: "House", currency: "CHF", amount: 1095000 } },
  { type: "rent", tag: "For Rent", title: "Penthouse with a view", location: "Zurich, Switzerland", price: "CHF 3'800 / month", details: "4.5 rooms · 126 m²", image: "/assets/optimized/projects/penthouse.webp", sample: true, extra: { propertyType: "Apartment", currency: "CHF", amount: 3800 } }
];

const internationalProperties = [
  ["Punta Cana", "Private villas surrounded by palm trees, beaches and Caribbean light.", "/assets/external/property-value-preservation/photo-1564013799919-ab600027ffc6-w1400-q85.webp"],
  ["Cap Cana", "Elegant residences in a gated community close to the marina and ocean.", "/assets/external/property-value-preservation/photo-1600585154340-be6161a56a0c-w1400-q85.webp"],
  ["Bavaro", "Relaxed apartments and holiday homes made for living and investing.", "/assets/external/property-value-preservation/photo-1620626011761-996317b8d101-w1200-q85.webp"]
];

const customerReviews = [
  ["Natasha Fischer", "Switzerland", "We are absolutely thrilled with Patricio's work. Both interior and exterior walls were painted perfectly. The work was clean, precise, and completed with great attention to detail."],
  ["Bettina Marinelli", "Switzerland", "Our ground floor, entrance, living room, kitchen, stairwell and doors were beautifully painted. Expert advice, careful execution, and excellent quality."],
  ["Melanie Bryan", "Aarau", "Amigos Maler provided expert advice and professional service. They were dedicated, helpful, and delivered outstanding results."],
  ["Sabiduri 1010", "Switzerland", "I needed help painting my office wall and couldn't have wished for a better person. Professional, reliable, and excellent work."],
  ["Rineta Slishani", "Switzerland", "Highly recommended! The work was completed reliably, on schedule, and with excellent quality."],
  ["Corinne Sittmann", "Switzerland", "Very friendly and competent advice. The work was completed quickly and to a high standard. I would definitely hire Amigos again."],
  ["Erich Leimgruber", "Switzerland", "The workers are very competent, clean, and precise. The price-performance ratio is excellent."],
  ["Benjamin Allemann", "Switzerland", "You guys are great, friendly, and very helpful. We would book you again anytime."],
  ["Matteo Müller", "Switzerland", "Excellent professionalism and dedication. Amigos provided great advice on colors and materials from the beginning."]
];

function Arrow() { return <span className={styles.arrow} aria-hidden="true">→</span>; }

function PuntaIcon({ type }) {
  const paths = {
    property: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    rent: <><path d="M4 19h16" /><path d="M6 17v-5" /><path d="M10 17V8" /><path d="M14 17v-3" /><path d="m5 8 5-4 4 3 5-4" /></>,
    invest: <><path d="M12 3v18" /><path d="M17 7.5c-.8-1.3-2.4-2.2-4.4-2.2-2.4 0-4.1 1.2-4.1 3 0 4.8 8.5 1.8 8.5 6.1 0 1.8-1.7 3-4.3 3-2 0-3.7-.8-4.6-2.2" /></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function FounderSection() {
  return (
    <section className={styles.founder}>
      <div className={styles.founderImageWrap}>
        <img src={process.env.NEXT_PUBLIC_MELANIE_PHOTO || "/Projects-Page-Woman.webp"} alt="Melanie Brian" loading="lazy" decoding="async" />
        <div className={styles.founderBadge}><span>★</span><div><strong>Melanie Brian</strong><small>Off-market adviser | Amigos Immo</small></div></div>
      </div>
      <div className={styles.founderCopy}>
        <p className={styles.kicker}>Off-market adviser and project coordinator | Amigos Immo</p>
        <h2>Meet Melanie.</h2>
        <p>Melanie Brian supports our clients with passion, discretion and a particular feel for real estate.</p>
        <p>She presents selected properties and discreetly helps a select group of clients find exclusive off-market opportunities.</p>
        <p>Working closely with Patricio Arias, she coordinates property projects and guides owners, buyers and investors personally from first contact to completion.</p>
        <blockquote>“Every property tells a story. Our goal is to bring people, opportunities and properties together with trust and foresight.”</blockquote>
        <a id="projects-founder-button" className={styles.founderButton} href="#enquiry"><span className={styles.founderArrow}>→</span>Contact Melanie</a>
      </div>
    </section>
  );
}

function InternationalFeature() {
  return (
    <section className={styles.puntaCana} id="punta-cana">
      <div className={styles.puntaCanaBeach} aria-hidden="true" />
      <div className={styles.puntaCanaShade} aria-hidden="true" />
      <div className={styles.puntaCanaInner}>
        <div className={styles.puntaCanaCopy}>
          <p className={styles.puntaCanaEyebrow}>PROJECTS &amp; REAL ESTATE</p>
          <h2>Punta <span>Cana</span></h2>
          <p className={styles.puntaCanaSubheading}>INVEST. LIVE. ENJOY.</p>
          <p className={styles.puntaCanaDescription}>Your connection to the Dominican Republic – with trust and strong partnership.</p>
          <div className={styles.puntaCanaFeatures}>
            <article className={styles.puntaCanaFeature}><span className={styles.puntaCanaFeatureIcon}><PuntaIcon type="property" /></span><h3>BUY REAL ESTATE</h3><p>Villas, apartments and land.</p></article>
            <article className={styles.puntaCanaFeature}><span className={styles.puntaCanaFeatureIcon}><PuntaIcon type="rent" /></span><h3>RENT</h3><p>Explore rental opportunities with local guidance.</p></article>
            <article className={styles.puntaCanaFeature}><span className={styles.puntaCanaFeatureIcon}><PuntaIcon type="invest" /></span><h3>INVEST</h3><p>Discuss individual projects, costs and risks with our team.</p></article>
          </div>
          <a id="punta-cana-learn-more" className={styles.puntaCanaButton} href="#international">LEARN MORE</a>
        </div>
        <div className={styles.puntaCanaVisual}>
          <img className={styles.puntaCanaPeople} src="/assets/optimized/projects/punta-cana.webp" alt="Two representatives standing with Dominican Republic flags" loading="lazy" decoding="async" />
          <aside className={styles.puntaCanaPersonCard}>
            <span className={styles.puntaCanaCrest} aria-hidden="true">✦</span>
            <div><strong>José Luis Díaz</strong><span>Consul General de la República Dominicana en Zürich, Suiza</span></div>
            <img className={styles.puntaCanaCardLogo} src="/assets/projects/dominican-republic-crest.webp" alt="Dominican Republic crest" loading="lazy" decoding="async" />
          </aside>
          <div className={styles.puntaCanaBadge}>In close cooperation with the General Consulate of the Dominican Republic in Zurich</div>
        </div>
      </div>
    </section>
  );
}

function ConsultationCta() {
  return (
    <section className={styles.consultationCta} id="beratung">
      <div className={styles.consultationCtaOverlay} />
      <div className={styles.consultationCtaContent}><p className={styles.kicker}>READY WHEN YOU ARE</p><h2>The future of your property, in one<br />conversation.</h2><p>Ask Melanie for a personal real estate consultation.</p><a id="projects-consultation-button" className={styles.primaryButton} href="#enquiry"><span className={styles.founderArrow}>→</span>Book Consultation</a></div>
    </section>
  );
}

function Testimonials() {
  const viewportRef = useRef(null);
  const [carouselState, setCarouselState] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const carousel = viewportRef.current;
    if (!carousel) return undefined;

    const updateCarouselState = () => {
      const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
      setCarouselState({ atStart: carousel.scrollLeft <= 4, atEnd: carousel.scrollLeft >= maxScroll - 4 });
    };

    updateCarouselState();
    carousel.addEventListener("scroll", updateCarouselState, { passive: true });
    window.addEventListener("resize", updateCarouselState);
    return () => {
      carousel.removeEventListener("scroll", updateCarouselState);
      window.removeEventListener("resize", updateCarouselState);
    };
  }, []);

  function moveCarousel(direction) {
    const carousel = viewportRef.current;
    if (!carousel) return;
    const nextPosition = Math.max(0, Math.min(carousel.scrollWidth - carousel.clientWidth, carousel.scrollLeft + direction * carousel.clientWidth));
    carousel.scrollTo({ left: nextPosition, behavior: "smooth" });
  }

  return (
    <section className={styles.testimonials}>
      <div className={styles.sectionHeader}><div><p className={styles.kicker}>CUSTOMER REVIEWS</p><h2>This is what our customers say.</h2></div><p>4.9 / 5 on Google, verified by our customers.</p></div>
      <div className={styles.reviewViewport}>
        <div className={styles.testimonialGrid} ref={viewportRef}>{customerReviews.map(([name, location, text]) => <blockquote key={name}><span>“</span><p>{text}</p><cite>{name} · {location}</cite><small>★★★★★</small></blockquote>)}</div>
      </div>
      <div className={styles.reviewControls} aria-label="Customer review controls"><button type="button" onClick={() => moveCarousel(-1)} aria-label="Previous review" disabled={carouselState.atStart}>←</button><button type="button" onClick={() => moveCarousel(1)} aria-label="Next review" disabled={carouselState.atEnd}>→</button></div>
    </section>
  );
}

function usePublishedProperties() {
  const [rows,setRows] = useState([]);
  const [catalogueState,setCatalogueState] = useState("loading");
  useEffect(()=>{
    const controller = new AbortController();
    fetch("/api/properties",{signal:controller.signal,cache:"no-store"})
      .then(res=>{if(!res.ok) throw new Error(); return res.json();})
      .then(data=>{setRows(data);setCatalogueState("ready");})
      .catch(error=>{if(error.name!=="AbortError") setCatalogueState("error");});
    return ()=>controller.abort();
  },[]);
  return {rows, catalogueState};
}

function ProjectEnquiry({published}) {
  const [listing, setListing] = useState("");
  useEffect(() => {
    const sync = () => {
      const requested = new URLSearchParams(window.location.search).get("listing");
      const choices = [...properties.map(({ title }) => title), ...internationalProperties.map(([title]) => title)];
      const entry = published.find(row => row.id === requested);
      setListing(entry ? entry.title + " · " + entry.id : choices.includes(requested) ? requested : "");
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [published]);
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "Sending your enquiry...") return;
    setStatus("Sending your enquiry...");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("source",window.location.pathname);
    formData.set("locale",document.documentElement.lang);
    formData.set("projectType", "Property enquiry");
    if (listing) formData.set("message", listing + "\n" + formData.get("message"));
    try {
      const response = await fetch("/api/consultations", { method: "POST", body: formData });
      if (!response.ok) throw new Error(response.status === 400 ? "Please choose a future date and time, or leave both empty." : "Unable to send your enquiry right now.");
      setSubmitted(true);
      setStatus("");
      form.reset();
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className={styles.enquiry} id="enquiry">
      <div className={styles.enquiryIntro}><p className={styles.kicker}>AMIGOS IMMO</p><span className={styles.enquiryUnderline} /><h2>Property enquiry</h2><p>Ask Melanie about a listing or a discreet off-market consultation.</p></div>
      <form className={styles.enquiryForm} onSubmit={handleSubmit} onChange={() => setSubmitted(false)}>
        {listing && <p>{listing}</p>}
        <div className={styles.enquiryGrid}>
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Email<input name="email" required type="email" placeholder="you@example.com" /></label>
          <label>Phone<input name="phone" placeholder="+41 ..." /></label>
        </div>
        <div className={styles.enquiryGrid}>
          <label>Preferred viewing date (optional)<input type="date" name="consultationDay" min={swissToday()} /></label>
          <label>Preferred viewing time<input type="time" name="consultationTime" /></label>
        </div>
        <p>Times are in Switzerland. Your appointment is confirmed personally by our team. Leave both fields empty to arrange a time together.</p>
        <label className={styles.enquiryMessage}>Your enquiry<textarea name="message" required minLength={10} maxLength={1900} /></label>
        <button id="projects-enquiry-button" className={styles.enquiryButton} type="submit" disabled={status === "Sending your enquiry..."}><span className={styles.enquiryButtonIcon} aria-hidden="true">→</span>{submitted ? "Enquiry sent" : "Send property enquiry"}</button>
        {status && <p className={styles.enquiryStatus} role="status">{status}</p>}
      </form>
    </section>
  );
}

export function PropertyListings() {
  const {rows, catalogueState} = usePublishedProperties();
  const additions = rows.filter(row=>row.region==="ch");
  const inventory = [...properties,...additions];
  const [filter, setFilter] = useState("all");
  useEffect(()=>{
    const frame = requestAnimationFrame(() => {
      const initialFilter = new URLSearchParams(window.location.search).get("filter");
      if (["rent","sale"].includes(initialFilter)) setFilter(initialFilter);
    });
    return () => cancelAnimationFrame(frame);
  },[]);
  const [location,setLocation] = useState("");
  const [propertyType,setPropertyType] = useState("");
  const [maxPrice,setMaxPrice] = useState("");
  const visibleProperties = filterProperties(inventory,{offer:filter,location,propertyType,maxPrice});

  return (
    <section className={styles.listings} id="objekte">
      <div className={styles.sectionHeader}><div><p className={styles.kicker}>SWITZERLAND</p><h2>Current Real Estate in Switzerland</h2><p className={styles.listingIntro}>Discover selected properties with character, potential and a clear path to the right decision.</p></div></div>
      <div className={styles.filterToolbar}>
        <div className={styles.filters} aria-label="Property filters"><span className={styles.filterLabel}>Listing type</span>{[["all", "All"], ["sale", "Buy"], ["rent", "Rent"]].map(([value, label]) => <button key={value} type="button" data-property-filter aria-pressed={filter === value} className={filter === value ? styles.filterActive : ""} onClick={() => setFilter(value)}>{label}</button>)}</div>
        <div className={styles.searchFilters}>
          <label><span>Location</span><input value={location} onChange={e=>setLocation(e.target.value)} type="search" placeholder="City or region" /></label>
          <label><span>Property type</span><select value={propertyType} onChange={e=>setPropertyType(e.target.value)}><option value="">All property types</option>{propertyTypes.map(type=><option key={type}>{type}</option>)}</select></label>
          <label><span>Maximum price</span><input value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} type="number" inputMode="numeric" min="0" placeholder="CHF" /></label>
        </div>
      </div>
      {catalogueState === "loading" && <div className={styles.catalogueNotice} role="status"><span className={styles.noticeIcon} aria-hidden="true">⌂</span><div><strong>Checking current availability</strong><p>Fresh listings are being loaded. The sample properties below show the homes we can help you find.</p></div></div>}
      {catalogueState === "error" && <div className={styles.catalogueNotice} role="status"><span className={styles.noticeIcon} aria-hidden="true">⌂</span><div><strong>Looking for something specific?</strong><p>Live availability is being updated. Tell Melanie what you need and we will check current and off-market options.</p></div><a className={styles.noticeLink} data-catalogue-action href="/projects#enquiry">Ask about availability <Arrow /></a></div>}
      {catalogueState === "ready" && !visibleProperties.length && <div className={styles.catalogueNotice} role="status"><span className={styles.noticeIcon} aria-hidden="true">⌕</span><div><strong>No exact match yet</strong><p>Adjust the filters or ask Melanie about current and off-market availability.</p></div><a className={styles.noticeLink} data-catalogue-action href="/projects#enquiry">Contact Melanie <Arrow /></a></div>}
      <div className={styles.propertyGrid}>{visibleProperties.map((property) => <article className={styles.propertyCard} key={property.id || property.title}><div className={styles.propertyImage}>{property.image && <img src={property.image} alt={property.title} loading="lazy" decoding="async" />}<span>{property.tag || (property.type==="sale"?"For Sale":"For Rent")}</span>{property.sample && <b className={styles.sampleBadge}>Sample listing</b>}</div><div className={styles.propertyBody}><p>{property.location}</p><h3>{property.title}</h3><span>{property.details}</span><strong>{property.price}</strong><a href={property.id ? `/projects/${encodeURIComponent(property.id)}` : `/projects?listing=${encodeURIComponent(property.title)}#enquiry`}>{property.sample ? "Ask about similar" : "View property"} <Arrow /></a></div></article>)}</div>
    </section>
  );
}

export function HomeMarketShowcase() {
  const entries = [
    ["LATEST PROPERTIES", "Buy or rent selected homes in Switzerland.", "/projects#objekte"],
    ["NEW BUILDINGS", "Explore carefully selected residences and new-build opportunities.", "/projects#objekte"],
    ["NEW PROJECTS", "Discover projects in Switzerland and international destinations.", "/projects#international"]
  ];
  const marketTabs = [["Buy", "/projects?filter=sale#objekte"], ["Sell", "/projects?purpose=Sell#list-property"], ["Rent", "/projects?filter=rent#objekte"]];

  return (
    <section className={styles.marketShowcase} aria-labelledby="home-market-heading">
      <div className={styles.marketShowcaseHeader}>
        <p className={styles.kicker}>AMIGOS IMMO</p>
        <h2 id="home-market-heading">Find your next property.</h2>
        <p>Explore the right route for buying, renting or discovering a new project.</p>
      </div>
      <nav className={styles.marketTabs} aria-label="Property actions">
        {marketTabs.map(([label, href]) => <a href={href} key={label}>{label}<Arrow /></a>)}
      </nav>
      <div className={styles.marketLinks}>
        {entries.map(([label, text, href]) => (
          <a className={styles.marketLink} href={href} key={label}>
            <span>{label}</span>
            <strong>{text}</strong>
            <Arrow />
          </a>
        ))}
      </div>
    </section>
  );
}

function QualityStandard() {
  return (
    <section className={styles.qualityStandard}>
      <div><p className={styles.kicker}>OUR STANDARD</p><h2>Quality with sustainable added value.</h2></div>
      <p>We look beyond the transaction: every property deserves thoughtful presentation, reliable coordination and decisions that protect its long-term value.</p>
    </section>
  );
}

export function SellRentCta() {
  return (
    <section className={styles.sellRentCta}>
      <div><p className={styles.kicker}>SELL OR RENT</p><h2>Would you like to sell or rent your property or apartment?</h2><p>List your properties directly on our platform and reach our interested buyers targeted.</p></div>
      <a className={styles.sellRentButton} href="/projects#list-property"><span aria-hidden="true">→</span>List Your Property</a>
    </section>
  );
}

export default function ProjectsContent() {
  const {rows:published} = usePublishedProperties();
  useEffect(() => {
    const root = document.documentElement;
    const syncHeroImages = () => {
      const isDark = root.dataset.theme === "amigos-dark" || root.dataset.theme === "dark";
      const lightImg = document.getElementById("projectsHeroImageLight");
      const darkImg = document.getElementById("projectsHeroImageDark");
      if (!lightImg || !darkImg) return;

      lightImg.style.opacity = isDark ? "0" : "1";
      darkImg.style.opacity = isDark ? "1" : "0";
      lightImg.style.display = isDark ? "none" : "block";
      darkImg.style.display = isDark ? "block" : "none";
    };

    syncHeroImages();
    const observer = new MutationObserver(syncHeroImages);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page}>
      <section className="hero projects-scrub-hero" data-hero>
        <div className="hero-media">
          <img
            id="projectsHeroImageLight"
            className="projects-hero-img projects-hero-img-light"
            src="/assets/about-redesign/hero-house-day.webp"
            alt="Amigos Maler projects hero, modern luxury property in daylight"
          />
          <img
            id="projectsHeroImageDark"
            className="projects-hero-img projects-hero-img-dark"
            src="/assets/about-redesign/hero-house.webp"
            alt="Amigos Maler projects hero, modern luxury property at dusk"
          />
        </div>
        <div className="hero-overlay" /><div className="hero-spotlight" />
        <div className={`hero-inner ${styles.heroContent}`}><div className="hero-eyebrow">Amigos Immo</div><h1>Sell. Rent. Invest.</h1><p className="hero-sub">Selected properties, international projects and personal guidance for owners, buyers and investors.</p><div className={styles.heroActions}><a id="projects-start-button" className={styles.heroButton} href="/projects#list-property"><span>→</span>List Your Property</a><a id="projects-explore-button" className={styles.heroButton} href="#objekte"><span>→</span>Discover properties</a></div></div>
      </section>

      <PropertyListings />
      <QualityStandard />
      <SellRentCta />

      <FounderSection />
      <section className={styles.regionalIntro}>
        <div><h2>No journey is too far for us.</h2>
        <p>Whether in Olten and the surrounding area, on Mallorca or in the Dominican Republic, our passion for property, quality and preserving value knows no borders.</p>
        <p>We support you with painting, renovations and property care. We have local roots and work internationally, combining personal commitment and craft to create lasting value.</p></div>
        <video className={styles.regionalVideo} autoPlay muted loop playsInline preload="metadata" poster="/assets/about-redesign/hero-house-day.webp" aria-label="Beachfront property representing Amigos Maler's international real estate work">
          <source src="/projects%20page/projects-hero-day-revised.webm" type="video/webm" />
          <source src="/projects%20page/projects-hero-day.mp4" type="video/mp4" />
        </video>
      </section>
      <InternationalFeature />

    <section className={styles.international} id="international"><div className={styles.sectionHeader}><div><p className={styles.kicker}>INTERNATIONAL</p><h2>Invest. Live.<br /><span>Enjoy.</span></h2></div><p>The Dominican Republic combines quality of life, growth and distinctive real estate. We open access to selected local projects.</p></div><div className={styles.internationalGrid}>{published.filter(row=>row.region==="do").map(row=><article className={styles.propertyCard} key={row.id}>{row.image && <img src={row.image} alt={row.title} loading="lazy" />}<div className={styles.propertyBody}><p>{row.location}</p><h3>{row.title}</h3><span>{row.details}</span><strong>{row.price}</strong><a href={`/projects/${encodeURIComponent(row.id)}`}>View property <Arrow /></a></div></article>)}{internationalProperties.map(([title, text, image]) => <article className={styles.internationalCard} key={title}><img src={image} alt={`${title} real estate`} loading="lazy" decoding="async" /><div><p>DOMINICAN REPUBLIC</p><h3>{title}</h3><span>{text}</span><a href={`/projects?listing=${encodeURIComponent(title)}#enquiry`}>Enquire <Arrow /></a></div></article>)}</div></section>

      <Testimonials />

      <section id="list-property" className={styles.ownerSection}><h2>List Your Property</h2><OwnerListingForm /></section>
      <ProjectEnquiry published={published} />

      <ConsultationCta />

    </main>
  );
}
