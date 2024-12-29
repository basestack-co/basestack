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
        source: "/",
        destination: "/hub",
        permanent: false,
      },
      {
        source: "/hub/form/:formId",
        destination: "/hub/form/:formId/submissions",
        permanent: false,
      },
      {
        source: "/a/form/:formId/settings",
        destination: "/a/form/:formId/settings/general",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
