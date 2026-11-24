export const publicOrigin = process.env.SITE_ORIGIN && new URL(process.env.SITE_ORIGIN).origin;
export const indexable = Boolean(publicOrigin && process.env.SITE_INDEXING === "enabled");
export const publicRoutes = ["/","/about","/services","/schadensservice","/property-value-preservation","/projects","/partners","/contact","/offer-calculator","/interior-painting","/exterior-painting","/spray-painting","/Facade-Renovation","/Plastering","/Drywall","/appartment-renovation","/water-damage","/mold","/color-and-material"];
