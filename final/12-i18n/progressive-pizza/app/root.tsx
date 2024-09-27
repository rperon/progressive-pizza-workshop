import { json, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useRouteError } from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import { Message } from "./components/ui/Message";
import { Layout as PizzaLayout } from "./components/ui/Layout";
import i18next, { i18nCookie } from "./i18next.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export async function loader({ request }: LoaderFunctionArgs) {
  let locale = await i18next.getLocale(request);
  return json({ locale }, { headers: { "Set-Cookie": await i18nCookie.serialize(locale) } });
}

export function Layout({ children }: { children: React.ReactNode }) {
  let { locale } = useLoaderData<typeof loader>();
  let { i18n } = useTranslation();
  useChangeLanguage(locale);
  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <PizzaLayout center>
      <Message title="Nous sommes désolé" subtitle="Une erreur s'est produite" imageUrl="/broken.png">
        Réessayez ou contactez le support.
      </Message>
    </PizzaLayout>
  );
}
