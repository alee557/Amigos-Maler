import { sql } from "@/lib/db";

export async function GET(request,{params}) {
  const {id}=await params;
  const [row]=await sql`select photo_webp from property_publications where consultation_id=${id} and published and photo_webp is not null`;
  if(!row) return new Response(null,{status:404});
  return new Response(row.photo_webp,{headers:{"Content-Type":"image/webp","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
}
