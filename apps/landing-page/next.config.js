const withTM = require("next-transpile-modules")(["@basestack/design-system"]);

module.exports = withTM({
  output: "export",
  reactStrictMode: true,
});
