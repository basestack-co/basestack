import baseConfig from "@basestack/config/eslint.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Include the base configuration
  ...baseConfig,
  
  // SDK-specific configuration
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
    rules: {
      // SDK-specific rule overrides can go here
    },
  },
  
  // Specific ignores for this package
  {
    ignores: [
      "dist/**",
      "examples/**",
      "*.config.{js,mjs,ts}",
    ],
  },
]; 