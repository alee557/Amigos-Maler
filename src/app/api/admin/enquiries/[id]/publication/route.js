import sharp from "sharp";
import { validatePropertyDetails } from "@/lib/propertyDetails";
import { sql } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/session";

export async function PUT(request,{params}) {
  if(!await verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) return new Response(null,{status:401});
  const {id}=await params;
  const data=await request.json().catch(()=>null);
  if(!data || typeof data.published!=="boolean") return new Response(null,{status:400});
  if(!data.published) {
    await sql`update property_publications set published=false where consultation_id=${id}`;
    return Response.json({published:false});
  }
  const {region,offer,title,location,details,price}=data;
  if(!["ch","do"].includes(region) || !["sale","rent"].includes(offer) ||
    [title,location,details,price].some(v=>typeof v!=="string" || !v.trim() || v.length>300)) return new Response(null,{status:400});
  const extra = validatePropertyDetails(data);
  if (!extra) return Response.json({error:"Invalid property details."},{status:400});
  let publicPhoto = null;
  if(data.publishPhoto === "on") {
    const [file] = await sql`select media_type, content from property_listing_attachments where consultation_id=${id}`;
    if(!file || !["image/jpeg","image/png"].includes(file.media_type)) return new Response(null,{status:400});
    try { publicPhoto = await sharp(file.content,{limitInputPixels:25000000}).rotate().resize({width:1200,withoutEnlargement:true}).webp({quality:82}).toBuffer(); }
    catch { return new Response(null,{status:400}); }
  }
  const rows=await sql`insert into property_publications(consultation_id,region,offer,title,location,details,price,published,photo_webp,extra)
    select id,${region},${offer},${title.trim()},${location.trim()},${details.trim()},${price.trim()},true,${publicPhoto},${sql.json(extra)} from consultations where id=${id} and project_type='Property listing'
    on conflict (consultation_id) do update set region=excluded.region, offer=excluded.offer,title=excluded.title,
    location=excluded.location,details=excluded.details,price=excluded.price,published=true,photo_webp=excluded.photo_webp,extra=excluded.extra returning consultation_id`;
  return new Response(null,{status:rows.length?204:404});
}
