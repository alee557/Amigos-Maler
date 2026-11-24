import { indexable, publicOrigin } from "@/lib/publicSite";
import BodyAttributes from "@/components/BodyAttributes";
import LanguageProvider from "@/components/LanguageProvider";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata = {
  title: "Amigos Maler",
  robots: { index: indexable, follow: indexable },
  description:
    "Painting, plastering, renovation and property value preservation services by Amigos Maler GmbH.",
  icons: {
    icon: "/assets/logo.webp"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        {publicOrigin && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org", "@type":"HousePainter", "@id":publicOrigin+"/#business",
          name:"Amigos Maler GmbH", url:publicOrigin, logo:publicOrigin+"/New-Logo.webp",
          telephone:"+41622129012", email:"info@amigos-maler.ch",
          address:{"@type":"PostalAddress",streetAddress:"Industriestrasse 14",postalCode:"4600",addressLocality:"Olten",addressCountry:"CH"},
          areaServed:{"@type":"Place",name:"Olten and surrounding areas"}
        }).replace(/</g,"\\u003c")}} /> }
        <LanguageProvider>
          <BodyAttributes />
          {children}
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
