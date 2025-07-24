import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import SearchDialog from "@/components/search";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Basestack Docs",
  description: "Basestack Documentation for Feature Flags and Forms",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>",
  },
  applicationName: "Basestack Docs",
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
    "forms as a service",
    "online forms",
    "open-source forms",
    "form builder",
    "submission management",
    "no-code forms",
    "HTML forms",
    "JavaScript forms",
    "developer tools",
    "startup forms",
    "self-hosted forms",
    "hosted forms",
    "Basestack forms",
  ],
  category: "software",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            SearchDialog,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
