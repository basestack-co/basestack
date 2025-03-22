import React from "react";
import Script from "next/script";
// Registries
import Registry from "utils/registry";
// Locales
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
// Fonts
import { Roboto_Flex, Roboto } from "next/font/google";

export const metadata = {
  title: "Basestack",
  description:
    "Basestack is an open-source stack designed specifically for developers and startups.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>",
  },
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
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${robotoFlex.variable} ${roboto.variable}`}>
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
