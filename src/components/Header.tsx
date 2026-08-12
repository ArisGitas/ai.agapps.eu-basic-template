"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";
import { useT, type Lang, type TranslationKey } from "@/lib/i18n";

const navLinks: { labelKey: TranslationKey; href: string }[] = [
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.contact", href: "#contact" },
];

function LanguageSwitch() {
  const { lang, setLang } = useT();
  const langs: Lang[] = ["en", "el"];
  return (
    <div data-role="lang-switch" data-agapps-id="header-lang-switch" className="flex items-center gap-1 text-xs font-semibold">
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-gray-300">|</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            data-agapps-id="header-lang-switch-button"
            className={lang === l ? "text-[#0070f3]" : "text-gray-400 hover:text-gray-600 transition-colors"}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  return (
    <header data-section="header" data-agapps-id="header-container" className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-role="logo" data-agapps-id="header-logo" className="text-xl font-bold text-gray-900 tracking-tight">
            {t("brand")}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-role="nav-link"
                data-agapps-id="header-nav-link-desktop"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitch />
            <a
              href="#contact"
              data-role="contact-button"
              data-agapps-id="header-cta-primary"
              className="inline-flex px-4 py-2 text-sm font-semibold bg-[#0070f3] text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t("contactUs")}
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-role="menu-toggle"
            data-agapps-id="header-menu-toggle"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                data-role="nav-link"
                data-agapps-id="header-nav-link-mobile"
                className="block text-sm font-medium text-gray-600 hover:text-gray-900 py-1"
              >
                {t(link.labelKey)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              data-role="contact-button"
              data-agapps-id="header-cta-primary-mobile"
              className="block text-sm font-semibold text-[#0070f3] py-1"
            >
              {t("contactUs")} →
            </a>
            <div className="pt-1">
              <LanguageSwitch />
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
