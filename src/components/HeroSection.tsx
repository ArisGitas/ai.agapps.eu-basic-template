"use client";

import { Container } from "./Container";
import { useT } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useT();
  return (
    <section data-section="hero" data-agapps-id="homepage-hero-container" className="bg-white py-24">
      <Container>
        <div className="max-w-2xl">
          <h1 data-role="title" data-agapps-id="homepage-hero-title" className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            {t("hero.title")}
          </h1>
          <p data-role="subtitle" data-agapps-id="homepage-hero-subtitle" className="text-xl text-gray-500 leading-relaxed mb-10">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              data-role="contact-button"
              data-agapps-id="homepage-hero-cta-primary"
              className="px-6 py-3 bg-[#0070f3] text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/20"
            >
              {t("contactUs")}
            </a>
            <a
              href="#services"
              data-role="cta-button"
              data-agapps-id="homepage-hero-cta-secondary"
              className="px-6 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {t("hero.servicesBtn")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
