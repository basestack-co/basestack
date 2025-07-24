// Types
import type { Metadata } from "next";
// Fonts
import { Roboto, Roboto_Flex, Roboto_Mono } from "next/font/google";
// Locales
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import type React from "react";
// Registries
import Registry from "utils/registry";

export const metadata: Metadata = {
  title: "Basestack",
  description:
    "Basestack is an open-source stack designed specifically for developers and startups.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>",
  },
  applicationName: "Basestack",
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
    "forms",
    "feature flags",
    "integration",
    "developer tools",
    "API",
    "automation",
    "form management",
    "release management",
    "SaaS",
    "tech stack",
  ],
  category: "software",
  openGraph: {
    type: "website",
    url: "https://basestack.co",
    title: "Basestack: Your Growth Toolkit Starts Here",
    description:
      "Discover Basestack - open-source tools like Forms and Feature Flags for solo devs, teams, and startups. Self-host for free or choose our hosted plans.",
    siteName: "Basestack",
    images: [{ url: "https://basestack.co/images/og-image.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@basestack_co",
    creator: "@basestack_co",
    images: "https://basestack.co/images/og-image.jpeg",
  },
};

const robotoMono = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto-mono",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto-flex",
});

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${robotoFlex.variable} ${roboto.variable} ${robotoMono.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Registry>{children}</Registry>
        </NextIntlClientProvider>
        <div id="portal" />
      </body>
    </html>
  );
};

export default RootLayout;
