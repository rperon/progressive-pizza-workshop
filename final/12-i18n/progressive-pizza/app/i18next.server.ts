import { createCookie } from "@remix-run/node";
import { RemixI18Next } from "remix-i18next/server";
import { i18nConfig } from "./i18n";

export const i18nCookie = createCookie("i18n", {
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

let i18next = new RemixI18Next({
  detection: {
    cookie: i18nCookie,
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng,
  },
  i18next: {
    ...i18nConfig,
  },
});

export default i18next;
