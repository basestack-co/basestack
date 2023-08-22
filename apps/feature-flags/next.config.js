const withTM = require("next-transpile-modules")(["@basestack/design-system"]);
const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate(
  withTM({
    reactStrictMode: true,
    // output: "standalone", // Enable this if the app is a standalone app for docker deployment
    async redirects() {
      return [
        {
          source: "/:projectSlug",
          destination: "/:projectSlug/flags",
          permanent: true,
        },
      ];
    },
  }),
);
