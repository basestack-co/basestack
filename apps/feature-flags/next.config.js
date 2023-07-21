const withTM = require("next-transpile-modules")(["@basestack/design-system"]);

module.exports = withTM({
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
  /* typescript: {
    ignoreBuildErrors: true,
  }, */
});
