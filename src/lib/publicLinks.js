function secureLink(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch { return null; }
}
export const whatsapp = "41622129012";
export const immoWhatsapp = whatsapp;
export const reviews = secureLink(process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL);
export const facebook = secureLink(process.env.NEXT_PUBLIC_FACEBOOK_URL);
export const instagram = secureLink(process.env.NEXT_PUBLIC_INSTAGRAM_URL);
