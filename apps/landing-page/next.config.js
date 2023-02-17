const withTM = require("next-transpile-modules")(["@basestack/design-system"]);

module.exports = withTM({
  reactStrictMode: true,
  /* typescript: {
    ignoreBuildErrors: true,
  }, */
});
