const withTM = require("next-transpile-modules")(["@basestack/design-system"]);

module.exports = withTM({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/ZVDXLgW6RVWuzB",
        destination: "/",
        permanent: false,
      },
    ];
  },
  /* typescript: {
    ignoreBuildErrors: true,
  }, */
});
