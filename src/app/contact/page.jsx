import { publicOrigin } from "@/lib/publicSite";
import SharedPageShell from "@/components/SharedPageShell";
import { carePackages } from "@/lib/carePackages";
import ContactHero from "./ContactHero";
import ContactFormStepper from "./ContactFormStepper";
import styles from "./ContactPage.module.css";

export const metadata = {
  title: "Kontakt | Amigos Maler in Olten",
  description: "Kontaktieren Sie Amigos Maler für eine Beratung, eine Besichtigung oder einen gewünschten Ausführungstermin.",
  alternates: publicOrigin ? {canonical:publicOrigin + "/contact"} : undefined
};

export default async function Page({ searchParams }) {
  const { care } = await searchParams;
  const carePackage = typeof care === "string" && Object.hasOwn(carePackages, care) ? carePackages[care] : "";
  return (
    <SharedPageShell>
      <main className={styles.contactPage}>
        <ContactHero />
        <ContactFormStepper key={carePackage} initialCarePackage={carePackage} />
      </main>
    </SharedPageShell>
  );
}
