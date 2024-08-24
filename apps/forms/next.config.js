const nextTranslate = require("next-translate-plugin");

const nextConfig = nextTranslate({
  reactStrictMode: true,
  // output: "standalone", // Enable this if the app is a standalone app for docker deployment
  transpilePackages: ["@basestack/design-system", "@basestack/ui"],
  logging: {
    fetches: {
      fullUrl: true,
    },
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
});

module.exports = nextConfig;
