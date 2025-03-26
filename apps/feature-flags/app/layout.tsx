import React from "react";
// Types
import type { Metadata } from "next";
// Registries
import Registry from "utils/registry";
// Locales
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
// Fonts
import { Roboto_Flex, Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Basestack Feature Flags",
  description:
    "Unlock Your Product Potential: Empower Your Team with Feature Flags",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏳️</text></svg>",
  },
  applicationName: "Basestack Feature Flags",
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
    "feature flags",
    "feature toggles",
    "open-source feature flags",
    "software development tools",
    "release management",
    "A/B testing",
    "remote configuration",
    "developer tools",
    "startup tech stack",
    "self-hosted feature flags",
    "hosted feature flags",
    "scalability tools",
    "Basestack feature flags",
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
