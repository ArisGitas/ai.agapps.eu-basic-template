"use client";

// Bilingual support for this template. Base language is English (en); Greek
// (el) is the secondary. A visitor's choice is remembered in localStorage and
// applied to <html lang>. See AGENTS.md §4 for how this is wired and how to
// add/translate copy. One key per visible string - keep BOTH languages filled.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "el";

const translations = {
  en: {
    brand: "Our Company",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    contactUs: "Contact us",
    "hero.title": "Professional Services for Your Business",
    "hero.subtitle":
      "Reliable solutions, fast delivery, and personal service. Discover how we can help your business grow.",
    "hero.servicesBtn": "See our services",
    "services.title": "Our Services",
    "services.subtitle": "We offer complete solutions for every need of your business.",
    "services.item1.title": "Fast Delivery",
    "services.item1.desc": "We deliver results quickly and reliably, with no delays.",
    "services.item2.title": "Guaranteed Quality",
    "services.item2.desc":
      "Every project is completed to the highest standards of quality and professionalism.",
    "services.item3.title": "Personal Service",
    "services.item3.desc":
      "We dedicate ourselves to each client individually to ensure their satisfaction.",
    "about.eyebrow": "About us",
    "about.title": "Years of experience at your service",
    "about.p1":
      "We are a team of professionals passionate about quality and results. Since 2010 we have served hundreds of businesses across Greece.",
    "about.p2":
      "Our philosophy is simple: every client deserves the best service, and every project deserves our full dedication.",
    "about.highlight1": "100+ satisfied clients",
    "about.highlight2": "10+ years of experience",
    "about.highlight3": "Available 24/7 for support",
    "about.imageAlt": "Company image",
    "cta.title": "Ready to work together?",
    "cta.subtitle":
      "Contact us today and let's discuss how we can help your business grow.",
    "cta.emailBtn": "Email us",
    "cta.phoneBtn": "Call us",
    "footer.tagline": "High-quality professional services for every business.",
    "footer.address": "Athens, Greece",
    "footer.rights": "All rights reserved.",
  },
  el: {
    brand: "Η Εταιρεία Μας",
    "nav.services": "Υπηρεσίες",
    "nav.about": "Σχετικά",
    "nav.contact": "Επικοινωνία",
    contactUs: "Επικοινωνήστε μαζί μας",
    "hero.title": "Επαγγελματικές Υπηρεσίες για την Επιχείρησή σας",
    "hero.subtitle":
      "Αξιόπιστες λύσεις, γρήγορη εκτέλεση και προσωπική εξυπηρέτηση. Ανακαλύψτε πώς μπορούμε να βοηθήσουμε την επιχείρησή σας να αναπτυχθεί.",
    "hero.servicesBtn": "Δείτε τις υπηρεσίες μας",
    "services.title": "Οι Υπηρεσίες μας",
    "services.subtitle": "Προσφέρουμε ολοκληρωμένες λύσεις για κάθε ανάγκη της επιχείρησής σας.",
    "services.item1.title": "Γρήγορη Εκτέλεση",
    "services.item1.desc": "Παραδίδουμε αποτελέσματα γρήγορα και αξιόπιστα, χωρίς καθυστερήσεις.",
    "services.item2.title": "Εγγυημένη Ποιότητα",
    "services.item2.desc":
      "Κάθε έργο ολοκληρώνεται με τα υψηλότερα πρότυπα ποιότητας και επαγγελματισμού.",
    "services.item3.title": "Προσωπική Εξυπηρέτηση",
    "services.item3.desc":
      "Αφιερωνόμαστε σε κάθε πελάτη ξεχωριστά για να εξασφαλίσουμε την ικανοποίησή του.",
    "about.eyebrow": "Σχετικά με εμάς",
    "about.title": "Χρόνια εμπειρίας στην υπηρεσία σας",
    "about.p1":
      "Είμαστε μια ομάδα επαγγελματιών με πάθος για την ποιότητα και τα αποτελέσματα. Από το 2010, εξυπηρετούμε εκατοντάδες επιχειρήσεις σε ολόκληρη την Ελλάδα.",
    "about.p2":
      "Η φιλοσοφία μας είναι απλή: κάθε πελάτης αξίζει την καλύτερη εξυπηρέτηση, κάθε έργο αξίζει την πλήρη αφοσίωσή μας.",
    "about.highlight1": "100+ ικανοποιημένοι πελάτες",
    "about.highlight2": "10+ χρόνια εμπειρίας",
    "about.highlight3": "Διαθέσιμοι 24/7 για υποστήριξη",
    "about.imageAlt": "Εικόνα εταιρείας",
    "cta.title": "Έτοιμοι να συνεργαστούμε;",
    "cta.subtitle":
      "Επικοινωνήστε μαζί μας σήμερα και ας συζητήσουμε πώς μπορούμε να βοηθήσουμε την επιχείρησή σας να αναπτυχθεί.",
    "cta.emailBtn": "Στείλτε μας email",
    "cta.phoneBtn": "Καλέστε μας",
    "footer.tagline": "Επαγγελματικές υπηρεσίες υψηλής ποιότητας για κάθε επιχείρηση.",
    "footer.address": "Αθήνα, Ελλάδα",
    "footer.rights": "Όλα τα δικαιώματα διατηρούνται.",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type TranslationKey = keyof (typeof translations)["en"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "site-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start on the base language so server and first client render match;
  // the saved choice is applied right after mount (below), avoiding a
  // hydration mismatch.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "el") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode) - the choice just won't persist.
    }
  }

  const t = (key: TranslationKey): string => translations[lang][key] ?? translations.en[key] ?? key;

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useT(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within <LanguageProvider>");
  return ctx;
}
