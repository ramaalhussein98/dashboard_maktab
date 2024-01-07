import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./translations/en.json";
import arTranslation from "./translations/ar.json";
i18n
  .use(initReactI18next) // Pass the i18next instance here
  .use(LanguageDetector) // Enable language detection
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    lng: "ar", // Set the default language
    fallbackLng: "ar", // Fallback language if translation is missing
  });

export default i18n;
