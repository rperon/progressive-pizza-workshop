import { createCookie } from "@remix-run/node";
import * as i18n from "./i18n"; // your i18n configuration file
import { RemixI18Next } from "remix-i18next/server";

export const i18nCookie = createCookie("i18n", {
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

let i18next = new RemixI18Next({
  detection: {
    cookie: i18nCookie,
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
  i18next: {
    ...i18n,
  },
});

export default i18next;
