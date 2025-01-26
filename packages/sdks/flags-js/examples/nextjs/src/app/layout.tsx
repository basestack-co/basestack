import React from "react";
import "./globals.css";
// Feature Flags
import FeatureFlagsProvider from "@/libs/feature-flags";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FeatureFlagsProvider
          config={{
            baseURL: "http://localhost:3000/api/v1",
            projectKey: "cm5qx25c900048onlrh1eloq5",
            environmentKey: "cm5qx25c900068onlvbtk1cdy",
          }}
        >
          {children}
        </FeatureFlagsProvider>
      </body>
    </html>
  );
}
