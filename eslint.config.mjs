import baseConfig from "./packages/config/eslint.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ["*.{js,mjs,ts}"],
    rules: {},
  },
];
