// Types
import type { Metadata } from "next";
// Fonts
import { Roboto, Roboto_Flex } from "next/font/google";
// Locales
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import type React from "react";
// Registries
import Registry from "utils/registry";

export const metadata: Metadata = {
  title: "Basestack Uptime",
  description:
    "Monitor your site's uptime and performance with Basestack Uptime",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⏱️</text></svg>",
  },
  applicationName: "Basestack Uptime",
  authors: [
    {
      name: "Vitor Amaral",
      url: "https://vitoramaral.co",
    },
    {
      name: "Flavio Amaral",
    },
  ],
  keywords: [
    "uptime",
    "monitoring",
    "status page",
    "website monitoring",
    "website uptime",
    "website status",
    "website performance",
    "website availability",
    "website reliability",
    "website monitoring",
    "website uptime",
  ],
  category: "software",
};

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto-flex",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${robotoFlex.variable} ${roboto.variable}`}>
      <body>
        <NextIntlClientProvider>
          <Registry>{children}</Registry>
        </NextIntlClientProvider>
        <div id="portal" />
      </body>
    </html>
  );
};

export default RootLayout;
