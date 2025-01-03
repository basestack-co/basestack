import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  transpilePackages: ["@basestack/design-system"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    reactCompiler: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(nextConfig);
