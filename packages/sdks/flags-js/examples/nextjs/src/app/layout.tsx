import type React from "react";
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
            baseURL: process.env.NEXT_PUBLIC_FEATURE_FLAGS_BASE_URL,
            projectKey: process.env.NEXT_PUBLIC_FEATURE_FLAGS_PROJECT_KEY!,
            environmentKey:
              process.env.NEXT_PUBLIC_FEATURE_FLAGS_ENVIRONMENT_KEY!,
          }}
        >
          {children}
        </FeatureFlagsProvider>
      </body>
    </html>
  );
}
