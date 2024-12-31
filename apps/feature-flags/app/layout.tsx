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
  title: "Basestack Feature Flags",
  description:
    "Unlock Your Product Potential: Empower Your Team with Feature Flags",
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
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      </body>
    </html>
  );
};

export default RootLayout;
