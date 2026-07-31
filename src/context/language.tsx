"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AppTexts } from "./AppTexts";
import en from "../locales/en.json";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  translations: AppTexts;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState<AppTexts>(en);

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await import(`../locales/${language}.json`);
      setTranslations(loadedTranslations.default);
    };

    loadTranslations();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
