# 12. I18n

To make our project international, we are going to use react-i18n.
To do so we are leveraging the work of [Sergio Xalambrí](https://github.com/sergiodxa) an heavy contributor to remix which created the [remix-18next](https://github.com/sergiodxa/remix-i18next) package.

```cli
npm install remix-i18next i18next react-i18next i18next-browser-languagedetector
```

Create `./app/locales/fr/common.json` and `./app/locales/en/common.json` with this initial translation:

```json fr
{
  "title": "Remixez votre pizza"
}
```

```json en
{
  "title": "Remix your pizz"
}
```

Create `./app/i18n.ts` and add the following configuration

```typescript
import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";

export const supportedLngs = ["en", "fr"];

export const fallbackLng = "en";

export const defaultNS = "common";

export const resources = {
  en: { common: en },
  fr: { common: fr },
};
```

Create `./app/i18next.server.ts` with the following configuration

```ts
import * as i18n from "./i18n"; // your i18n configuration file
import { RemixI18Next } from "remix-i18next/server";

let i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
  i18next: {
    ...i18n,
  },
});

export default i18next;
```

We now need to configure the client-side and the server-side configuration.
In the client side.

```cli
npm install --save-dev i18next-parser
```
