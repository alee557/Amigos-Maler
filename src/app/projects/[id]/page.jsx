import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { publicOrigin } from "@/lib/publicSite";
import AssetPageShell from "@/components/AssetPageShell";
import styles from "./property.module.css";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const {id} = await params;
  const [property] = await sql`select title,location from property_publications where consultation_id=${id} and published`;
  return {
    title:property ? `${property.title} | Amigos Immo` : "Property details | Amigos Immo",
    description:property ? `${property.title} in ${property.location}. View approved property details and arrange a viewing with Amigos Immo.` : undefined,
    alternates:publicOrigin ? {canonical:`${publicOrigin}/projects/${encodeURIComponent(id)}`} : undefined
  };
}
export default async function PropertyPage({params}) {
  const {id} = await params;
  const [property] = await sql`select consultation_id as id,title,location,details,price,offer,extra,photo_webp is not null as has_photo from property_publications where consultation_id=${id} and published`;
  if (!property) notFound();
  const extra = property.extra || {};
  const images = [...(property.has_photo ? [`/api/properties/${encodeURIComponent(id)}/photo`] : []),...(extra.gallery || [])];
  return <AssetPageShell gsap={false}><main className={styles.page}>
    <a href="/projects#objekte">Back to properties</a>
    <header><p>{property.location}</p><h1>{property.title}</h1><p>{property.offer === "rent" ? "For Rent" : "For Sale"}{extra.status ? ` · ${extra.status}` : ""}</p><strong>{property.price}</strong></header>
    {images.length > 0 && <div className={styles.gallery}>{images.map((src,i)=><a href={src} key={src} target="_blank" rel="noopener noreferrer"><img src={src} alt={`${property.title} — ${i+1}`} loading={i ? "lazy" : "eager"} /></a>)}</div>}
    <p>{property.details}</p>
    <dl className={styles.facts}>
      {extra.propertyType && <div><dt>Property type</dt><dd>{extra.propertyType}</dd></div>}
      {extra.rooms && <div><dt>Rooms</dt><dd>{extra.rooms}</dd></div>}
      {extra.area && <div><dt>Area</dt><dd>{extra.area} m²</dd></div>}
      {extra.development && <div><dt>Development stage</dt><dd>{extra.development}</dd></div>}
    </dl>
    {extra.description && <section><h2>About this property</h2><p className={styles.description}>{extra.description}</p></section>}
    {!!extra.documents?.length && <section><h2>Property documents</h2><ul>{extra.documents.map((href,i)=><li key={href}><a href={href} target="_blank" rel="noopener noreferrer">Document {i+1}</a></li>)}</ul></section>}
    <section><h2>Arrange a viewing</h2><p>Contact our team about this property and your preferred viewing date.</p><a className={styles.cta} href={`/projects?listing=${encodeURIComponent(id)}#enquiry`}>Enquire about this property</a></section>
  </main></AssetPageShell>;
}
