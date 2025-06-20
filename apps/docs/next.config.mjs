import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      new URL("https://i.imgur.com/**"),
      new URL("https://vercel.com/**"),
    ],
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
