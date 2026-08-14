"use client";

import { Container } from "./Container";
import { useT } from "@/lib/i18n";

export function CTASection() {
  const { t } = useT();
  return (
    <section id="contact" data-section="cta" data-agapps-id="homepage-cta-container" className="bg-[#0070f3] py-20">
      <Container>
        <div className="text-center">
          <h2 data-role="title" data-agapps-id="homepage-cta-title" data-agapps-key="cta.title" className="text-3xl font-bold text-white mb-4">
            {t("cta.title")}
          </h2>
          <p data-role="subtitle" data-agapps-id="homepage-cta-subtitle" data-agapps-key="cta.subtitle" className="text-blue-100 max-w-xl mx-auto mb-10">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:info@example.com"
              data-role="email-link"
              data-agapps-id="homepage-cta-email-link" data-agapps-key="cta.emailBtn"
              className="px-6 py-3 bg-white text-[#0070f3] text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              {t("cta.emailBtn")}
            </a>
            <a
              href="tel:+302101234567"
              data-role="phone-link"
              data-agapps-id="homepage-cta-phone-link" data-agapps-key="cta.phoneBtn"
              className="px-6 py-3 border border-white/30 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              {t("cta.phoneBtn")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
