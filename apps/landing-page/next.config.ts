import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@basestack/design-system"],
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
