import { sql } from "@/lib/db";

export async function GET() {
  try {
    const rows=await sql`select consultation_id as id,region,offer as type,title,location,details,price,extra,case when photo_webp is not null then '/api/properties/' || consultation_id || '/photo' end as image
      from property_publications where published order by title,consultation_id`;
    return Response.json(rows,{headers:{"Cache-Control":"no-store"}});
  } catch { return Response.json({error:"Catalogue unavailable."},{status:503}); }
}
