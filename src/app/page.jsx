import { publicOrigin } from "@/lib/publicSite";
import AssetPageShell from "@/components/AssetPageShell";
import HomeBeforeOffer from "@/components/home/HomeBeforeOffer";
import HomeBeforeProjects from "@/components/home/HomeBeforeProjects";
import HomeProjectsAndAfter from "@/components/home/HomeProjectsAndAfter";
import OfferCalculatorHomeCta from "@/components/offer-calculator/OfferCalculatorHomeCta";

// Keep the homepage legacy stylesheet in sync with the responsive hero controls.
export const metadata = {
  title: "Amigos Maler GmbH | Malerarbeiten und Renovationen in Olten",
  description: "Malerarbeiten, Renovationen, Schadenservice und Werterhalt in Olten und Umgebung. Entdecken Sie die Leistungen von Amigos Maler GmbH.",
  alternates: publicOrigin ? {canonical:publicOrigin + "/"} : undefined
};

const forcedHomeHeroButtonCss = `
@keyframes homeHeroButtonBorderFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

#homeHeroButtons.hero-buttons,
html body #homeHeroButtons.hero-buttons,
html body .hero-content .hero-buttons {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  justify-content: center !important;
  width: auto !important;
  max-width: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
  text-align: center !important;
  gap: 18px !important;
}

#homeHeroCreatingLastingValue,
html body #homeHeroCreatingLastingValue,
html body .hero-content h2#homeHeroCreatingLastingValue {
  font-size: clamp(34px, 7vw, 64px) !important;
  font-weight: 800 !important;
  line-height: 1.15 !important;
  text-align: center !important;
  letter-spacing: -0.01em !important;
  margin-bottom: clamp(12px, 2vw, 20px) !important;
}

html body .hero-content p {
  font-size: clamp(16px, 2.5vw, 22px) !important;
  line-height: 1.5 !important;
  text-align: center !important;
}

#homeHeroButtons.hero-buttons > a.btn-primary,
#homeHeroButtons.hero-buttons > a.btn-secondary,
html body #homeHeroButtons.hero-buttons > a.btn-primary,
html body #homeHeroButtons.hero-buttons > a.btn-secondary,
html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-primary,
html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-secondary {
  position: relative !important;
  isolation: isolate !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
  min-width: 210px !important;
  min-height: 54px !important;
  padding: 16px 30px !important;
  overflow: hidden !important;
  border: 0 !important;
  border-radius: 999px !important;
  background: rgba(255, 255, 255, .03) !important;
  background-color: rgba(255, 255, 255, .03) !important;
  background-image: none !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  line-height: 1 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  box-shadow: none !important;
  backdrop-filter: blur(18px) saturate(1.18) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.18) !important;
}

@media (max-width: 768px) {
  #homeHeroButtons.hero-buttons,
  html body #homeHeroButtons.hero-buttons,
  html body .hero-content .hero-buttons {
    flex-direction: column !important;
    width: 100% !important;
    gap: 14px !important;
  }

  #homeHeroButtons.hero-buttons > a.btn-primary,
  #homeHeroButtons.hero-buttons > a.btn-secondary,
  html body #homeHeroButtons.hero-buttons > a.btn-primary,
  html body #homeHeroButtons.hero-buttons > a.btn-secondary,
  html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-primary,
  html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-secondary {
    width: min(360px, calc(100% - 32px)) !important;
    max-width: 360px !important;
    align-self: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

#homeHeroButtons.hero-buttons > a.btn-primary::before,
#homeHeroButtons.hero-buttons > a.btn-secondary::before,
html body #homeHeroButtons.hero-buttons > a.btn-primary::before,
html body #homeHeroButtons.hero-buttons > a.btn-secondary::before,
html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-primary::before,
html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-secondary::before {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: 0 !important;
  padding: 1.5px !important;
  border-radius: inherit !important;
  background: linear-gradient(105deg, #f6be10 0%, #f39125 28%, #e62453 56%, #f6be10 100%) !important;
  background-size: 260% 260% !important;
  animation: homeHeroButtonBorderFlow 4.5s ease-in-out infinite !important;
  pointer-events: none !important;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0) !important;
  -webkit-mask-composite: xor !important;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0) !important;
  mask-composite: exclude !important;
}

#homeHeroButtons.hero-buttons > a.btn-primary::after,
#homeHeroButtons.hero-buttons > a.btn-secondary::after,
html body #homeHeroButtons.hero-buttons > a.btn-primary::after,
html body #homeHeroButtons.hero-buttons > a.btn-secondary::after,
html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-primary::after,
html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-secondary::after {
  content: none !important;
  display: none !important;
}

#homeHeroButtons.hero-buttons > a.btn-primary:hover,
#homeHeroButtons.hero-buttons > a.btn-secondary:hover,
html body #homeHeroButtons.hero-buttons > a.btn-primary:hover,
html body #homeHeroButtons.hero-buttons > a.btn-secondary:hover,
html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-primary:hover,
html[data-theme="amigos-dark"] body #homeHeroButtons.hero-buttons > a.btn-secondary:hover {
  transform: translateY(-3px) !important;
  background: linear-gradient(105deg, #f6be10 0%, #f39125 44%, #e62453 100%) !important;
  background-color: transparent !important;
  background-image: linear-gradient(105deg, #f6be10 0%, #f39125 44%, #e62453 100%) !important;
  box-shadow: none !important;
}
`;

const homeHeroOverlayResetCss = `
html:not([data-theme="amigos-dark"]) body[data-page="home"] #homeHero .hero-overlay {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  filter: none !important;
}

html:not([data-theme="amigos-dark"]) section[data-home-hero] .intro-title-main,
html:not([data-theme="amigos-dark"]) section[data-home-hero] .intro-title-gmbh,
html:not([data-theme="amigos-dark"]) section[data-home-hero] .intro-title-sub,
html:not([data-theme="amigos-dark"]) section[data-home-hero] .hero-content h1,
html:not([data-theme="amigos-dark"]) section[data-home-hero] .hero-content p {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

/* Hero copy is always white (it sits on the sky/photo), in every theme and regardless of
   legacy per-theme rules. */
html body section[data-home-hero] .hero-overlay .intro-title,
html body section[data-home-hero] .hero-overlay .intro-title *,
html body section[data-home-hero] .hero-overlay .intro-title-main,
html body section[data-home-hero] .hero-overlay .intro-title-gmbh,
html body section[data-home-hero] .hero-overlay .intro-title-sub,
html body section[data-home-hero] .hero-overlay h1,
html body section[data-home-hero] .hero-overlay h1 *,
html body section[data-home-hero] .hero-overlay p {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  text-shadow: 0 2px 18px rgba(0, 0, 0, .35) !important;
}

html body section[data-home-hero] .hero-overlay h2#homeHeroColorMessage span#homeHeroColorAccent {
  background: linear-gradient(100deg, #f6be10 0%, #f36b35 48%, #ef168e 100%) !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
  font-weight: 800 !important;
  text-shadow: none !important;
}
`;

const brandHeroCss = `
html body[data-page="home"] section[data-home-hero] .intro-title {
  mix-blend-mode: normal !important;
}

html body[data-page="home"] #homeHero #homeIntroCta {
  position: absolute !important;
  left: 50% !important;
  width: min(360px, calc(100% - 32px)) !important;
  max-width: 360px !important;
  margin: 0 !important;
  transform: translateX(-50%) !important;
  z-index: 2 !important;
}


@media (min-width: 769px) {
  [data-home-hero] .responsive-hero-copy { display: none !important; }
  html body[data-page="home"] section[data-home-hero] .intro-title {
    width: min(96vw, 1840px) !important;
  }
  [data-home-hero] .intro-title-brand { display: inline-flex !important; }
  [data-home-hero] .intro-title-main {
    font-size: clamp(48px, 8.5vw, 140px) !important;
    line-height: .95 !important;
    white-space: nowrap !important;
  }
  [data-home-hero] .intro-title-gmbh {
    font-size: clamp(16px, 1.8vw, 30px) !important;
    font-weight: 800 !important;
  }
  [data-home-hero] .intro-title-sub {
    display: block !important;
    width: min(980px, 92vw) !important;
    margin: 24px auto 0 !important;
    font-size: clamp(15px, 1.35vw, 20px) !important;
    line-height: 1.55 !important;
  }
  html body[data-page="home"] #homeHero #homeIntroCta {
    top: calc(max(110px, 13vh) + clamp(190px, 18vw, 280px)) !important;
  }
}

@media (max-width: 768px) {
  [data-home-hero] .intro-title-brand,
  [data-home-hero] .intro-title-sub { display: none !important; }
  [data-home-hero] .responsive-hero-copy,
  [data-home-hero] .responsive-hero-brand { display: grid !important; justify-items: center; line-height: 1; }
  html body section[data-home-hero] h1.intro-title .responsive-hero-amigos { background: linear-gradient(100deg,#f6be10,#f36b35,#cf2487); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent !important; text-shadow: none !important; }
  [data-home-hero] .responsive-hero-brand { font-weight: 800; }
  [data-home-hero] .responsive-hero-amigos,
  [data-home-hero] .responsive-hero-maler { font-size: clamp(3.2rem, 13.5vw, 6rem) !important; line-height: .9 !important; }
  [data-home-hero] .responsive-hero-maler-line { display: flex !important; align-items: end !important; gap: .14em !important; }
  [data-home-hero] .responsive-hero-maler-line small {
    font-size: clamp(2.2rem, 9.2vw, 4.2rem) !important;
    font-weight: 900 !important;
    letter-spacing: 0.02em !important;
    line-height: 0.9 !important;
    margin-bottom: 0.04em !important;
  }
  [data-home-hero] .responsive-hero-heading { margin: .55em 0; font-size: clamp(1.75rem,7.2vw,3rem) !important; font-weight: 500; line-height: .95 !important; }
  [data-home-hero] .responsive-hero-services {
    font-size: clamp(.85rem,3.6vw,1.25rem) !important;
    line-height: 1.4;
    margin-bottom: clamp(28px, 6vw, 42px) !important;
  }
  html body[data-page="home"] #homeHero .hero-overlay {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding-top: max(110px, 13vh) !important;
    pointer-events: none !important;
  }
  html body[data-page="home"] section[data-home-hero] .intro-title {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    transform: none !important;
    width: min(920px, calc(100% - 32px)) !important;
    margin: 0 auto !important;
    pointer-events: auto !important;
  }
  html body[data-page="home"] #homeHero #homeIntroCta {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    transform: none !important;
    margin: 0 auto !important;
    pointer-events: auto !important;
  }
}
`;

export default function Page() {
  return (
    <AssetPageShell
      css={["/style.css"]}
      scripts={["/script.js"]}
      shell
    >
      <HomeBeforeOffer />
      <OfferCalculatorHomeCta />
      <HomeBeforeProjects />
      <HomeProjectsAndAfter />
      <style dangerouslySetInnerHTML={{ __html: forcedHomeHeroButtonCss }} data-home-hero-button-force />
      <style dangerouslySetInnerHTML={{ __html: homeHeroOverlayResetCss + brandHeroCss }} data-home-hero-overlay-reset />
    </AssetPageShell>
  );
}
