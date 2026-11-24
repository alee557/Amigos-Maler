import { publicOrigin } from "@/lib/publicSite";
import AssetPageShell from "@/components/AssetPageShell";
import ServicesContent from "./ServicesContent";

export const metadata = {
  title: "Dienstleistungen | Amigos Maler",
  description: "Malerarbeiten, Gipsarbeiten, Fassaden, Renovationen und Spritzwerkstatt in der Region Olten.",
  alternates: publicOrigin ? {canonical:publicOrigin + "/services"} : undefined
};

export default function Page() {
  return (
    <AssetPageShell
      css={["/service.css"]}
      scripts={["/service.js"]}
      shell>
      <ServicesContent />
    </AssetPageShell>
  );
}
