import Footer from "./Footer";
import Header from "./Header";

export default function SharedPageShell({ children }) {
  return (
    <>
      <link rel="stylesheet" href="/legacy/styles/partial.css?v=20261122c" precedence="amigos-shared" />
      <link rel="stylesheet" href="/legacy/styles/site-audit.css?v=20261122c" precedence="amigos-shared" />
      <link rel="stylesheet" href="/legacy/styles/services-mega-menu.css" precedence="amigos-shared" />
      <Header />
      <style dangerouslySetInnerHTML={{
        __html: `
        html body:has(.color-hero) .site-header .header-actions .customer-header-btn,
        html body:has(.color-hero) .site-header .header-actions .header-btn,
        html body:has(.color-hero) .site-header .header-actions .customer-header-btn *,
        html body:has(.color-hero) .site-header .header-actions .header-btn * {
          color: #fff !important;
          -webkit-text-fill-color: #fff !important;
          stroke: currentColor !important;
        }
        html[data-theme="amigos-light"] body #siteHeader.site-header:is(.is-scrolled, .scrolled) .header-actions :is(#headerCustomerLoginBtn, #headerQuoteBtn),
        html[data-theme="amigos-light"] body #siteHeader.site-header:is(.is-scrolled, .scrolled) .header-actions :is(#headerCustomerLoginBtn, #headerQuoteBtn) *,
        html:not([data-theme="amigos-dark"]) body #siteHeader.site-header:is(.is-scrolled, .scrolled) .header-actions :is(#headerCustomerLoginBtn, #headerQuoteBtn),
        html:not([data-theme="amigos-dark"]) body #siteHeader.site-header:is(.is-scrolled, .scrolled) .header-actions :is(#headerCustomerLoginBtn, #headerQuoteBtn) *,
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header .header-actions :is(#headerCustomerLoginBtn, #headerQuoteBtn),
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header .header-actions :is(#headerCustomerLoginBtn, #headerQuoteBtn) *,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header .header-actions :is(#headerCustomerLoginBtn, #headerQuoteBtn),
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header .header-actions :is(#headerCustomerLoginBtn, #headerQuoteBtn) * {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          stroke: #000000 !important;
        }
        html[data-theme="amigos-light"] body #siteHeader.property-value-preservation-header #headerDisplaySettings span,
        html:not([data-theme="amigos-dark"]) body #siteHeader.property-value-preservation-header #headerDisplaySettings span {
          background: #000000 !important;
          background-color: #000000 !important;
        }
        html:not([data-theme="amigos-dark"]) body #siteHeader:not(.home-initial) #headerCustomerLoginBtn,
        html:not([data-theme="amigos-dark"]) body #siteHeader:not(.home-initial) #headerQuoteBtn,
        html:not([data-theme="amigos-dark"]) body #siteHeader.is-scrolled #headerCustomerLoginBtn,
        html:not([data-theme="amigos-dark"]) body #siteHeader.is-scrolled #headerQuoteBtn,
        html[data-theme="amigos-light"] body #siteHeader #headerCustomerLoginBtn,
        html[data-theme="amigos-light"] body #siteHeader #headerQuoteBtn {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }
        html:not([data-theme="amigos-dark"]) body #siteHeader:not(.home-initial) #headerCustomerLoginIcon,
        html:not([data-theme="amigos-dark"]) body #siteHeader:not(.home-initial) #headerCustomerLoginIcon *,
        html:not([data-theme="amigos-dark"]) body #siteHeader.is-scrolled #headerCustomerLoginIcon,
        html:not([data-theme="amigos-dark"]) body #siteHeader.is-scrolled #headerCustomerLoginIcon *,
        html[data-theme="amigos-light"] body #siteHeader #headerCustomerLoginIcon,
        html[data-theme="amigos-light"] body #siteHeader #headerCustomerLoginIcon * {
          color: #000000 !important;
          stroke: #000000 !important;
          fill: none !important;
        }
        html:not([data-theme="amigos-dark"]) body #siteHeader:not(.home-initial) #headerDisplaySettings span,
        html:not([data-theme="amigos-dark"]) body #siteHeader.is-scrolled #headerDisplaySettings span,
        html[data-theme="amigos-light"] body #siteHeader #headerDisplaySettings span {
          background: #000000 !important;
          background-color: #000000 !important;
        }
        html:not([data-theme="amigos-dark"]) body #siteHeader .servicesToggle,
        html:not([data-theme="amigos-dark"]) body #siteHeader .servicesToggle svg,
        html:not([data-theme="amigos-dark"]) body #siteHeader .sectionMenu > button,
        html:not([data-theme="amigos-dark"]) body #siteHeader .sectionMenu > button svg,
        html:not([data-theme="amigos-dark"]) body #siteHeader [class*="navChevron"],
        html:not([data-theme="amigos-dark"]) body #siteHeader [class*="navChevron"] path,
        html[data-theme="amigos-light"] body #siteHeader .servicesToggle,
        html[data-theme="amigos-light"] body #siteHeader .servicesToggle svg,
        html[data-theme="amigos-light"] body #siteHeader .sectionMenu > button,
        html[data-theme="amigos-light"] body #siteHeader .sectionMenu > button svg,
        html[data-theme="amigos-light"] body #siteHeader [class*="navChevron"],
        html[data-theme="amigos-light"] body #siteHeader [class*="navChevron"] path {
          color: #000000 !important;
          stroke: #000000 !important;
        }
        #siteHeader .site-nav {
          gap: clamp(14px, 1.4vw, 22px) !important;
        }
        #siteHeader .servicesToggle,
        #siteHeader .sectionMenu button,
        #siteHeader [class*="servicesToggle"],
        #siteHeader [class*="sectionMenu"] > button {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 10px !important;
          min-width: 10px !important;
          height: 14px !important;
          margin: 0 0 0 4px !important;
          padding: 0 !important;
        }
        #siteHeader [class*="navChevron"] {
          width: 10px !important;
          height: 6px !important;
        }
      ` }} data-color-material-header-contrast />
      {children}
      <Footer />
    </>
  );
}
