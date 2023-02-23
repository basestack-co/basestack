const withTM = require("next-transpile-modules")([
  "@basestack/design-system",
  "@piwikpro/next-piwik-pro",
]);

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
