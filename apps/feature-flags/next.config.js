const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate({
  reactStrictMode: true,
  // output: "standalone", // Enable this if the app is a standalone app for docker deployment
  transpilePackages: ["@basestack/design-system"],
  async redirects() {
    return [
      {
        source: "/:projectSlug",
        destination: "/:projectSlug/flags",
        permanent: true,
      },
    ];
  },
});
