import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  transpilePackages: ["@basestack/design-system", "@basestack/ui"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(nextConfig);
