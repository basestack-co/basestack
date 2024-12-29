import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: "standalone", // Enable this if the app is a standalone app for docker deployment
  transpilePackages: ["@basestack/design-system", "@basestack/ui"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/form/:formId",
        destination: "/form/:formId/submissions",
        permanent: false,
      },
      {
        source: "/form/:formId/settings",
        destination: "/form/:formId/settings/general",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
