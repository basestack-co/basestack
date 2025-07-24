import baseConfig from "@basestack/config/eslint.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ["src/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        // Add browser globals for SDK
        window: "readonly",
        document: "readonly",
        fetch: "readonly",
      },
    },
    rules: {},
  },
  {
    ignores: ["dist/**", "examples/**", "*.config.{js,mjs,ts}"],
  },
];
