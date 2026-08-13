"use client";

import { Container } from "./Container";
import { useT, type TranslationKey } from "@/lib/i18n";

const highlightKeys: TranslationKey[] = ["about.highlight1", "about.highlight2", "about.highlight3"];

export function AboutSection() {
  const { t } = useT();
  return (
    <section id="about" data-section="about" data-agapps-id="homepage-about-container" className="bg-white py-20">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span data-agapps-id="homepage-about-eyebrow" className="inline-block text-sm font-semibold text-[#0070f3] mb-4">
              {t("about.eyebrow")}
            </span>
            <h2 data-role="title" data-agapps-id="homepage-about-title" className="text-3xl font-bold text-gray-900 mb-6">
              {t("about.title")}
            </h2>
            <p data-role="subtitle" data-agapps-id="homepage-about-subtitle" className="text-gray-500 leading-relaxed mb-4">
              {t("about.p1")}
            </p>
            <p data-agapps-id="homepage-about-body" className="text-gray-500 leading-relaxed mb-8">
              {t("about.p2")}
            </p>
            <ul className="space-y-3">
              {highlightKeys.map((key) => (
                <li key={key} data-agapps-id="homepage-about-highlight-item" className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          {/* Replace with <Image> from next/image when you have a real photo */}
          <div data-agapps-id="homepage-about-image-placeholder" className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
            <span className="text-gray-400 text-sm">{t("about.imageAlt")}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
