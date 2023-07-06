const withTM = require("next-transpile-modules")(["@basestack/design-system"]);

module.exports = withTM({
  reactStrictMode: true,
  output: "standalone", // need to support docker
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
