"use client";

import { Container } from "./Container";
import { useT, type TranslationKey } from "@/lib/i18n";

// Icons stay in code (not translated); title/description come from the
// dictionary so both languages stay in sync. See src/lib/i18n.tsx.
const services: { titleKey: TranslationKey; descKey: TranslationKey; icon: React.ReactNode }[] = [
  {
    titleKey: "services.item1.title",
    descKey: "services.item1.desc",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    titleKey: "services.item2.title",
    descKey: "services.item2.desc",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    titleKey: "services.item3.title",
    descKey: "services.item3.desc",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
  },
];

export function ServicesSection() {
  const { t } = useT();
  return (
    <section id="services" data-section="services" data-agapps-id="homepage-services-container" className="bg-gray-50 py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 data-role="title" data-agapps-id="homepage-services-title" data-agapps-key="services.title" className="text-3xl font-bold text-gray-900 mb-4">{t("services.title")}</h2>
          <p data-role="subtitle" data-agapps-id="homepage-services-subtitle" data-agapps-key="services.subtitle" className="text-gray-500 max-w-xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.titleKey}
              data-role="service-item"
              data-agapps-id="homepage-services-item-card"
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-50 text-[#0070f3] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  {service.icon}
                </svg>
              </div>
              <h3 data-role="item-title" data-agapps-id="homepage-services-item-title" data-agapps-key={service.titleKey} className="text-lg font-semibold text-gray-900 mb-2">{t(service.titleKey)}</h3>
              <p data-role="item-description" data-agapps-id="homepage-services-item-description" data-agapps-key={service.descKey} className="text-gray-500 text-sm leading-relaxed">{t(service.descKey)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
