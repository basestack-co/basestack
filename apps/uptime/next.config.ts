import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: "standalone", // Enable this if the app is a standalone app for docker deployment
  transpilePackages: [
    "@basestack/design-system",
    "@basestack/ui",
    "@basestack/vendors",
  ],
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
        destination: "/a",
        permanent: false,
      },
      {
        source: "/a/service/:serviceId",
        destination: "/a/service/:serviceId/monitors",
        permanent: false,
      },
      {
        source: "/a/service/:serviceId/settings",
        destination: "/a/service/:serviceId/settings/general",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
