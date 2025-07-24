import baseConfig from "@basestack/config/eslint.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ["src/**/*.{js,ts,tsx}"],
    rules: {},
  },
  {
    ignores: ["dist/**", "*.config.{js,mjs,ts}"],
  },
];
