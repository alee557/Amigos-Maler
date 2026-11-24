"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAmigosAudio } from "@/lib/useAmigosAudio";
import { useLanguage } from "./LanguageProvider";
import ServicesMegaMenu from "./ServicesMegaMenu";
import styles from "./Header.module.css";

const imageHeroPaths = new Set([
  "/",
  "/about",
  "/appartment-renovation",
  "/color-and-material",
  "/Drywall",
  "/exterior-painting",
  "/Facade-Renovation",
  "/interior-painting",
  "/mold",
  "/molding",
  "/Plastering",
  "/projects",
  "/services",
  "/spray-painting",
  "/water-damage",
]);

const servicePaths = new Set([
  "/services",
  "/appartment-renovation",
  "/color-and-material",
  "/Drywall",
  "/exterior-painting",
  "/Facade-Renovation",
  "/interior-painting",
  "/mold",
  "/molding",
  "/Plastering",
  "/spray-painting",
  "/water-damage",
]);

function NavChevron() {
  return (
    <svg className={styles.navChevron} viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

function SectionMenu({ href, label, children, active, open, setOpen }) {
  const toggle = useRef(null);
  const panelId = href.slice(1) + "-submenu";
  return (
    <div className={styles.sectionMenu}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setOpen(href); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setOpen(null); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}
      onKeyDown={(event) => { if (event.key === "Escape") { setOpen(null); toggle.current.focus(); } }}>
      <a href={href} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined}>{label}</a>
      <button type="button" ref={toggle} aria-label={label} aria-controls={panelId} aria-expanded={open}
        onClick={() => setOpen(open ? null : href)}><NavChevron /></button>
      <div className={styles.sectionLinks} id={panelId} hidden={!open}>{children}</div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";
  const isProjects = pathname === "/projects";
  const isInteriorPainting = pathname === "/interior-painting";
  const isExteriorPainting = pathname === "/exterior-painting";
  const isFacadeRenovation = pathname === "/Facade-Renovation";
  const isAppartmentRenovation = pathname === "/appartment-renovation";
  const isDrywall = pathname === "/Drywall";
  const isPlastering = pathname === "/Plastering";
  const isSprayPainting = pathname === "/spray-painting";
  const isColorMaterial = pathname === "/color-and-material";
  const isMold = pathname === "/mold";
  const isWaterDamage = pathname === "/water-damage";
  const isPropertyValuePreservation = pathname === "/property-value-preservation";
  const isDamageService = pathname === "/schadensservice";
  const hasImageHero = imageHeroPaths.has(pathname);
  const isServicesPage = servicePaths.has(pathname) && !isMold && !isWaterDamage;
  const isActive = (href) => pathname === href;
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [drawerOpen,setDrawerOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const servicesCloseTimer = useRef(null);
  const { isPlaying: isAudioPlaying, toggleSound } = useAmigosAudio();
  const { locale, setLocale, t } = useLanguage();
  const languageNames = { en: "English", de: "Deutsch", es: "Español" };

  useEffect(() => {
    const header = document.getElementById("siteHeader");
    if (!header) return undefined;

    const updateHeaderState = () => {
      const hero = document.querySelector("[data-hero]");
      const heroScrollArea = hero?.parentElement?.classList.contains("pin-spacer")
        ? hero.parentElement
        : hero;
      const isScrolled = heroScrollArea
        ? heroScrollArea.getBoundingClientRect().bottom <= 0
        : true;
      const isLightMode = !document.documentElement.dataset.theme?.includes("dark");
      const isLightHeader = isLightMode && (isScrolled || !hasImageHero);
      const useBlackHeaderActions = isLightHeader
        || (isSprayPainting && !isScrolled)
        || (isLightMode && (isServicesPage || isWaterDamage || isMold));

      ["headerCustomerLoginBtn", "headerQuoteBtn"].forEach((id) => {
        const button = document.getElementById(id);
        if (useBlackHeaderActions) {
          button?.style.setProperty("color", "#000000", "important");
          button?.style.setProperty("-webkit-text-fill-color", "#000000", "important");
        } else {
          button?.style.setProperty("color", "#ffffff", "important");
          button?.style.setProperty("-webkit-text-fill-color", "#ffffff", "important");
        }
      });

      const loginIcon = document.getElementById("headerCustomerLoginIcon");
      if (useBlackHeaderActions) {
        loginIcon?.style.setProperty("stroke", "#000000", "important");
        loginIcon?.style.setProperty("color", "#000000", "important");
        loginIcon?.querySelectorAll("path").forEach((p) => {
          p.style.setProperty("stroke", "#000000", "important");
        });
      } else {
        loginIcon?.style.setProperty("stroke", "#ffffff", "important");
        loginIcon?.style.setProperty("color", "#ffffff", "important");
        loginIcon?.querySelectorAll("path").forEach((p) => {
          p.style.setProperty("stroke", "#ffffff", "important");
        });
      }

      const settingsTrigger = document.getElementById("headerDisplaySettings");
      if (useBlackHeaderActions) {
        settingsTrigger?.querySelectorAll("span").forEach((s) => {
          s.style.setProperty("background-color", "#000000", "important");
          s.style.setProperty("background", "#000000", "important");
        });
      } else {
        settingsTrigger?.querySelectorAll("span").forEach((s) => {
          s.style.setProperty("background-color", "#ffffff", "important");
          s.style.setProperty("background", "#ffffff", "important");
        });
      }

      const chevronColor = useBlackHeaderActions ? "#000000" : "#ffffff";
      const chevrons = header.querySelectorAll(
        ".servicesToggle svg, .sectionMenu button svg, [class*='servicesToggle'] svg, [class*='sectionMenu'] button svg, .navChevron, [class*='navChevron']"
      );
      chevrons.forEach((svg) => {
        svg.style.setProperty("stroke", chevronColor, "important");
        svg.style.setProperty("color", chevronColor, "important");
        svg.querySelectorAll("path").forEach((p) => {
          p.style.setProperty("stroke", chevronColor, "important");
        });
      });
      header.querySelectorAll(
        ".servicesToggle, .sectionMenu button, [class*='servicesToggle'], [class*='sectionMenu'] > button"
      ).forEach((btn) => {
        btn.style.setProperty("color", chevronColor, "important");
      });

      if (isHome) {
        const heroStart = heroScrollArea
          ? window.scrollY + heroScrollArea.getBoundingClientRect().top
          : 0;
        const heroAnimationDistance = heroScrollArea && hero
          ? Math.max(heroScrollArea.offsetHeight - hero.offsetHeight, 1)
          : 1;
        const heroProgress = (window.scrollY - heroStart) / heroAnimationDistance;

        header.classList.toggle("is-revealed", heroProgress >= 0.18 || isScrolled);
      }

      header.classList.toggle("is-scrolled", isScrolled);
      header.classList.toggle("scrolled", isScrolled);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState, { passive: true });

    const observer = new MutationObserver(() => {
      updateHeaderState();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
      observer.disconnect();
    };
  }, [hasImageHero, isHome, isMold, isServicesPage, isSprayPainting, isWaterDamage, pathname]);

  useEffect(() => {
    let active = true;

    fetch("/api/customer/me", { cache: "no-store" })
      .then((response) => {
        if (active) setIsCustomerLoggedIn(response.ok);
      })
      .catch(() => {
        if (active) setIsCustomerLoggedIn(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => () => clearTimeout(servicesCloseTimer.current), []);

  const openServicesMenu = () => {
    clearTimeout(servicesCloseTimer.current);
    setIsServicesOpen(true);
  };

  const closeServicesMenuSoon = () => {
    clearTimeout(servicesCloseTimer.current);
    servicesCloseTimer.current = setTimeout(() => setIsServicesOpen(false), 180);
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("amigos-theme");
    const shouldUseDarkTheme = savedTheme === "amigos-dark";

    document.documentElement.dataset.theme = shouldUseDarkTheme ? "amigos-dark" : "amigos-light";
    const frame = window.requestAnimationFrame(() => setIsDarkTheme(shouldUseDarkTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const closeSettingsOnOutsideClick = (event) => {
      const menu = document.querySelector(".header-settings-menu");
      if (menu?.open && !menu.contains(event.target)) menu.removeAttribute("open");
    };

    document.addEventListener("click", closeSettingsOnOutsideClick);
    return () => document.removeEventListener("click", closeSettingsOnOutsideClick);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((currentTheme) => {
      const nextTheme = !currentTheme;
      const themeName = nextTheme ? "amigos-dark" : "amigos-light";

      document.documentElement.dataset.theme = themeName;
      window.localStorage.setItem("amigos-theme", themeName);

      return nextTheme;
    });
  };

  return (
      <header className={`site-header${isHome ? " home-initial" : ""}${isAbout || isProjects ? " about-header" : ""}${isContact ? " contact-header" : ""}${pathname === "/services" ? " services-overview-header" : ""}${isDamageService ? " damage-service-header" : ""}${isInteriorPainting ? " interior-painting-header" : ""}${isExteriorPainting ? " exterior-painting-header" : ""}${isFacadeRenovation ? " facade-renovation-header" : ""}${isAppartmentRenovation ? " appartment-renovation-header" : ""}${isDrywall ? " drywall-header" : ""}${isPlastering ? " plastering-header" : ""}${isSprayPainting ? " spray-painting-header" : ""}${isColorMaterial ? " color-material-header" : ""}${isMold ? " mold-header" : ""}${isWaterDamage ? " water-damage-header" : ""}${isPropertyValuePreservation ? " property-value-preservation-header" : ""}${hasImageHero ? " image-hero-header" : ""}`} id="siteHeader">
      <a className={`logo ${styles.logoLink}`} href="/" aria-label="Amigos Maler home">
        <span className={styles.logoSymbol} aria-hidden="true">
          <img src="/logo.webp" alt="" />
        </span>
        <span className={styles.logoWordmark}>
          <strong>AMIGOS MALER</strong>
          <small>KOMPETENZ VERBINDET</small>
        </span>
      </a>

      <nav id="mobileNavigation" className={`site-nav${drawerOpen ? " open" : ""} ${styles.navigation}`}
        onKeyDown={event=>{if(event.key==="Escape" && drawerOpen){setDrawerOpen(false);document.querySelector(".hamburger")?.focus();}}}
        onClick={event=>{if(event.target.closest("a")){setDrawerOpen(false);setOpenSection(null);setIsServicesOpen(false);}}}>
        <a href="/" data-page="home" className={isActive("/") ? "is-active" : undefined} aria-current={isActive("/") ? "page" : undefined}>
          {t("Home")}
        </a>
        <a href="/about" data-page="about" className={isActive("/about") ? "is-active" : undefined} aria-current={isActive("/about") ? "page" : undefined}>
          {t("About Us")}
        </a>

        <div
          className={`nav-dropdown${isServicesOpen ? " open" : ""}`}
          onMouseEnter={()=>{if (!drawerOpen) openServicesMenu();}}
          onMouseLeave={closeServicesMenuSoon}
          onFocus={event=>{if (!drawerOpen && event.target.tagName !== "BUTTON") openServicesMenu();}}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) closeServicesMenuSoon();
          }}
        >
          <a
            href="/services"
            className={`dropdown-trigger${isServicesPage ? " is-active" : ""}`}
            aria-current={isServicesPage ? "page" : undefined}
          >
            {t("Services")}
          </a>
          <button className={styles.servicesToggle} type="button" aria-label={t("Services")} aria-controls="services-panel" aria-expanded={isServicesOpen} onClick={()=>setIsServicesOpen(!isServicesOpen)}><NavChevron /></button>
          <ServicesMegaMenu isDark={isDarkTheme} />
        </div>

        <SectionMenu href="/schadensservice" label={t("Claims and Services")} active={isDamageService || isMold || isWaterDamage}
          open={openSection === "/schadensservice"} setOpen={setOpenSection}>
          <a href="/water-damage">{t("Water Damage")}</a>
          <a href="/mold">{t("Mold Remediation")}</a>
        </SectionMenu>
        <SectionMenu href="/property-value-preservation" label={t("Werterhalt")} active={isPropertyValuePreservation}
          open={openSection === "/property-value-preservation"} setOpen={setOpenSection}>
          <a href="/property-value-preservation#plans">{t("Home Care – private clients")}<small>Basic · Plus · Premium</small></a>
          <a href="/property-value-preservation#business-care">{t("Business Care – business clients")}<small>Flex · Partner</small></a>
        </SectionMenu>
        <SectionMenu href="/projects" label="Amigos Immo" active={isProjects}
          open={openSection === "/projects"} setOpen={setOpenSection}>
          <a href="/projects#objekte">{t("Swiss properties")}</a>
          <a href="/projects#punta-cana">{t("Punta Cana – investments")}</a>
          <a href="/projects#list-property">{t("List Your Property")}</a>
        </SectionMenu>
        <a href="/partners" data-page="partners" className={isActive("/partners") ? "is-active" : undefined} aria-current={isActive("/partners") ? "page" : undefined}>
          {t("Become a Partner")}
        </a>

        <a href="/contact" data-page="contact" className={isActive("/contact") ? "is-active" : undefined} aria-current={isActive("/contact") ? "page" : undefined}>
          {t("Contact")}
        </a>
      </nav>

      <div className="header-actions">
        <a
          id="headerCustomerLoginBtn"
          href={isCustomerLoggedIn ? "/customer/dashboard" : "/customer/login"}
          className="customer-header-btn"
        >
          <svg id="headerCustomerLoginIcon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21a8 8 0 1 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {isCustomerLoggedIn ? t("Customer Portal") : t("Customer Login")}
        </a>

        <a id="headerQuoteBtn" href="/#quote" className="header-btn">
          {t("Request A Quote")}
        </a>
      </div>

      <details className="header-settings-menu">
        <summary id="headerDisplaySettings" className="header-settings-trigger" aria-controls="headerSettingsDropdown" aria-label="Open display settings" title="Display settings">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </summary>
        <div id="headerSettingsDropdown" className="header-settings-dropdown">
          <div className="header-toggle-group">
            <label className={styles.languageControl} data-i18n-skip>
              <span id="headerLanguageLabel" className={styles.languageLabel}>{t("Language")}</span>
              <span id="headerLanguageValue" className={styles.languageCurrent} aria-hidden="true">
                <span className={`${styles.languageFlag} ${styles[`languageFlag${locale.toUpperCase()}`]}`}></span>
                <span>{locale.toUpperCase()}</span>
                <span className={styles.languageChevron}>⌄</span>
              </span>
              <select value={locale} onChange={(event) => setLocale(event.target.value)} aria-label="Language">
                <option value="en">{languageNames.en}</option>
                <option value="de">{languageNames.de}</option>
                <option value="es">{languageNames.es}</option>
              </select>
            </label>
            <button
              className={`sound-toggle${isAudioPlaying ? " is-playing" : ""}`}
              type="button"
              aria-label={isAudioPlaying ? "Musik stummschalten" : "Musik abspielen"}
              aria-pressed={isAudioPlaying}
              title={isAudioPlaying ? "Musik an: Smooth Lounge Jazz" : "Musik aus"}
              onClick={toggleSound}
            >
              <span className="sound-toggle-icon" aria-hidden="true">
                {isAudioPlaying ? (
                  <span className="sound-bars">
                    <span className="sound-bar bar-1"></span>
                    <span className="sound-bar bar-2"></span>
                    <span className="sound-bar bar-3"></span>
                  </span>
                ) : (
                  <svg className="sound-icon sound-icon-muted" viewBox="0 0 24 24" fill="none">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            </button>

            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${isDarkTheme ? "light" : "navy"} theme`}
              aria-pressed={isDarkTheme}
              onClick={toggleTheme}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                {isDarkTheme ? (
                  <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20.2 14.2A7.6 7.6 0 0 1 9.8 3.8 8.5 8.5 0 1 0 20.2 14.2Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4.2" fill="currentColor" />
                    <path
                      d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </details>

      <button className={`hamburger${drawerOpen ? " active" : ""}`} aria-label={t("Toggle menu")} aria-controls="mobileNavigation" aria-expanded={drawerOpen} onClick={()=>setDrawerOpen(!drawerOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
