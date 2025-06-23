import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/docs/forms",
        permanent: false,
      },
      {
        source: "/docs",
        destination: "/docs/forms",
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
