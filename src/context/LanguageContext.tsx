"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import en from "../locales/en.json";
import hi from "../locales/hi.json";
import ur from "../locales/ur.json";
// For prototype, we mock imports for others using en fallback dynamically
const translations: Record<string, any> = { en, hi, ur };

type LanguageCode = "en" | "hi" | "bn" | "te" | "mr" | "ta" | "gu" | "kn" | "ml" | "pa" | "ur" | "or" | "as";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as LanguageCode;
    if (saved) setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === "ur" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string) => {
    const langDict = translations[language] || translations["en"];
    return langDict[key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: language === "ur" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
