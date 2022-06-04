const withMarkdoc = require("@markdoc/next.js");
const withTM = require("next-transpile-modules")(["design-system"]);
// const withTM = require("next-transpile-modules")(["design-system"]);

module.exports = withTM(
  withMarkdoc(/* config: https://markdoc.io/docs/nextjs#options */)({
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdoc"],
  })
);
