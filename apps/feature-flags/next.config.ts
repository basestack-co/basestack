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
        destination: "/a",
        permanent: false,
      },
      {
        source: "/a/project/:projectId",
        destination: "/a/project/:projectId/flags",
        permanent: false,
      },
      {
        source: "/a/project/:projectId/settings",
        destination: "/a/project/:projectId/settings/general",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
