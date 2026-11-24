import { publicOrigin } from "@/lib/publicSite";
import AssetPageShell from "@/components/AssetPageShell";
import PropertyValuePreservationContent from "./PropertyValuePreservationContent";

export const metadata = {
  title: "Werterhalt | Home Care und Business Care",
  description: "Home Care für Privatkunden und Business Care für Geschäftskunden. Wählen Sie das passende Paket für Ihre Immobilie.",
  alternates: publicOrigin ? {canonical:publicOrigin + "/property-value-preservation"} : undefined
};

export default function Page() {
  return (
    <AssetPageShell gsap={false}>
      <PropertyValuePreservationContent />
    </AssetPageShell>
  );
}
