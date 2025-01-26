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
        <FeatureFlagsProvider>{children}</FeatureFlagsProvider>
      </body>
    </html>
  );
}
