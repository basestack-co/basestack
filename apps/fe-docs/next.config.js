const withMarkdoc = require("@markdoc/next.js")();
const withTM = require("next-transpile-modules")(["@basestack/design-system"]);

/* module.exports = withMarkdoc()({
  pageExtensions: ["md", "mdoc", "js", "jsx", "ts", "tsx"],
}); */

module.exports = withTM(
  withMarkdoc({ pageExtensions: ["md", "mdoc", "js", "jsx", "ts", "tsx"] })
);
