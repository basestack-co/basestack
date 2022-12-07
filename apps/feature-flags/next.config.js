const withTM = require("next-transpile-modules")(["@basestack/design-system"]);

module.exports = withTM({
  reactStrictMode: true,
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
