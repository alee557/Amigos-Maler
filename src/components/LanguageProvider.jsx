"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { locales, translateMessage } from "@/lib/i18n";

const LanguageContext = createContext(null);

function translateLegacyText(locale) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (!parent || parent.closest("script, style, textarea, input, [data-i18n-skip]")) continue;
    nodes.push(node);
  }

  nodes.forEach((node) => {
    if (node.nodeValue !== node.__amigosLastValue) node.__amigosI18nOriginal = node.nodeValue;
    const original=node.__amigosI18nOriginal;
    if (!original?.trim()) return;
    const next=original.replace(original.trim(),translateMessage(original.trim(),locale));
    if(next !== node.nodeValue) node.nodeValue=next;
    node.__amigosLastValue=next;
  });
}

function translateLegacyAttributes(locale) {
  document.querySelectorAll("[alt], [title], [aria-label], [placeholder], [data-name]").forEach((element) => {
    ["alt", "title", "aria-label", "placeholder", "data-name"].forEach((attribute) => {
      if (!element.hasAttribute(attribute) || element.closest("[data-i18n-skip]")) return;
      element.__amigosI18nOriginalAttributes ||= {};
      element.__amigosI18nOriginalAttributes[attribute] ||= element.getAttribute(attribute);
      const original = element.__amigosI18nOriginalAttributes[attribute];
      const translated = translateMessage(original, locale);
      if (translated) element.setAttribute(attribute, translated);
    });
  });
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export default function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState("de");
  useEffect(() => {
    const saved=window.localStorage.getItem("amigos-locale");
    if (!locales.includes(saved)) return undefined;
    const frame = window.requestAnimationFrame(() => setLocaleState(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const localeRef = useRef(locale);

  useEffect(() => {
    localeRef.current = locale;
    document.documentElement.lang = locale;
    translateLegacyText(locale);
    translateLegacyAttributes(locale);
  }, [locale]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      translateLegacyText(localeRef.current);
      translateLegacyAttributes(localeRef.current);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const value = useMemo(() => ({
    locale,
    setLocale: (nextLocale) => {
      if (locales.includes(nextLocale)) { window.localStorage.setItem("amigos-locale", nextLocale); setLocaleState(nextLocale); }
    },
    t: (value) => translateMessage(value, locale)
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
