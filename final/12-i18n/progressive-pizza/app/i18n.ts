import { InitOptions } from "i18next";
import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";

export const i18nConfig = {
  supportedLngs: ["en", "fr"],
  fallbackLng: "en",
  defaultNS: "common",
  resources: {
    en: { common: en },
    fr: { common: fr },
  },
} satisfies InitOptions;
