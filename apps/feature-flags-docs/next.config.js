const withTM = require("next-transpile-modules")(["@basestack/design-system"]);

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withTM(withNextra());
