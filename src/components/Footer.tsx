"use client";

import { Container } from "./Container";
import { useT, type TranslationKey } from "@/lib/i18n";

const navLinks: { labelKey: TranslationKey; href: string }[] = [
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.contact", href: "#contact" },
];

export function Footer() {
  const { t } = useT();
  return (
    <footer data-section="footer" data-agapps-id="global-footer-container" className="bg-gray-900 text-gray-400 py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <span data-role="logo" data-agapps-id="global-footer-logo" className="text-white font-bold text-lg block mb-2">{t("brand")}</span>
            <p data-agapps-id="global-footer-tagline" className="text-sm max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} data-role="nav-link" data-agapps-id="global-footer-nav-link" className="hover:text-white transition-colors">
                {t(link.labelKey)}
              </a>
            ))}
          </nav>
          <address className="not-italic text-sm space-y-1">
            <p data-role="email-link" data-agapps-id="global-footer-email-link">info@example.com</p>
            <p data-role="phone-link" data-agapps-id="global-footer-phone-link">+30 210 123 4567</p>
            <p data-role="address" data-agapps-id="global-footer-address">{t("footer.address")}</p>
          </address>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span data-agapps-id="global-footer-copyright">© {new Date().getFullYear()} {t("brand")}. {t("footer.rights")}</span>
          <span className="text-gray-600">
            Powered by{" "}
            <a href="https://agapps.eu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">
              agapps.eu
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
