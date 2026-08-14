"use client";

// Bilingual support for this template. Base language is English (en); Greek
// (el) is the secondary. A visitor's choice is remembered in localStorage and
// applied to <html lang>. Translations live in src/content/{locale}.json (see
// AGENTS.md §5) so the platform's visual editor can patch one language's value
// with a minimal diff. One key per visible string - keep BOTH languages filled.

import en from "@/content/en.json";
import el from "@/content/el.json";
import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "en" | "el";

const translations = { en, el };

export type TranslationKey = keyof typeof en;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// The chosen language lives in localStorage, read through useSyncExternalStore
// so the server always renders the base language ("en") and the client
// reconciles to the saved choice on hydration with no mismatch and no
// setState-in-effect. Same-tab writes notify subscribers manually (the
// "storage" event only fires in OTHER tabs).
const STORAGE_KEY = "site-lang";
const listeners = new Set<() => void>();

function readLang(): Lang {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "en" || v === "el" ? v : "en";
  } catch {
    return "en";
  }
}

function writeLang(next: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // localStorage unavailable (private mode) - the choice just won't persist.
  }
  listeners.forEach((fn) => fn());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore<Lang>(subscribe, readLang, () => "en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: TranslationKey): string => translations[lang][key] ?? translations.en[key] ?? key;

  return <LanguageContext.Provider value={{ lang, setLang: writeLang, t }}>{children}</LanguageContext.Provider>;
}

export function useT(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within <LanguageProvider>");
  return ctx;
}
