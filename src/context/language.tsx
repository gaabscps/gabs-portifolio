"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AppTexts } from "./AppTexts";
import ptbr from "../locales/ptbr.json";

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
  const [language, setLanguage] = useState("ptbr");
  const [translations, setTranslations] = useState<AppTexts>(ptbr);

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
