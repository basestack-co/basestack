const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate({
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
        source: "/project/:projectId",
        destination: "/project/:projectId/flags",
        permanent: false,
      },
      {
        source: "/project/:projectId/settings",
        destination: "/project/:projectId/settings/general",
        permanent: false,
      },
    ];
  },
});
