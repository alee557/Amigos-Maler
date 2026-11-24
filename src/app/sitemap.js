import { indexable, publicOrigin, publicRoutes } from "@/lib/publicSite";
import { sql } from "@/lib/db";

export default async function sitemap() {
  if (!indexable) return [];
  const routes = publicRoutes.map(path=>({url:publicOrigin+path}));
  try {
    const properties = await sql`select consultation_id as id from property_publications where published order by consultation_id`;
    routes.push(...properties.map(({id})=>({url:`${publicOrigin}/projects/${encodeURIComponent(id)}`})));
  } catch (error) {
    console.error("Published properties could not be added to the sitemap:", error);
  }
  return routes;
}
