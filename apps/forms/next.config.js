const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate({
  reactStrictMode: true,
  // output: "standalone", // Enable this if the app is a standalone app for docker deployment
  transpilePackages: ["@basestack/design-system", "@basestack/ui"],
  async redirects() {
    return [
      {
        source: "/:formId",
        destination: "/:formId/submissions",
        permanent: false,
      },
      {
        source: "/:formId/settings",
        destination: "/:formId/settings/general",
        permanent: false,
      },
    ];
  },
});
