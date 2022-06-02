const withTM = require("next-transpile-modules")(["design-system"]);

module.exports = withTM({
  reactStrictMode: true,
  /* typescript: {
    ignoreBuildErrors: true,
  }, */
});
