import { indexable, publicOrigin } from "@/lib/publicSite";
export default function robots() {
  if (!indexable) return {rules:{userAgent:"*",disallow:"/"}};
  return {rules:{userAgent:"*",allow:"/",disallow:["/admin","/api/","/customer"]},sitemap:publicOrigin+"/sitemap.xml"};
}
