import { publicOrigin } from "@/lib/publicSite";
import AssetPageShell from "@/components/AssetPageShell";
import ProjectsContent from "./ProjectsContent";

export const metadata = {
  title: "Amigos Immo | Immobilien Schweiz und Punta Cana",
  description: "Immobilien kaufen, verkaufen, vermieten oder inserieren. Melanie Brian begleitet Eigentümer, Käufer und Investoren.",
  alternates: publicOrigin ? {canonical:publicOrigin + "/projects"} : undefined
};

export default function Page() {
  return (
    <AssetPageShell
      css={["/style.css","amigos/styles.css","amigos/premium.css","amigos/theme.css","amigos/projects-theme.css"]}
      scripts={["amigos/main.js","amigos/calc.js","amigos/projects-hero.js"]}
      shell
      gsap>
      <ProjectsContent />
    </AssetPageShell>
  );
}
