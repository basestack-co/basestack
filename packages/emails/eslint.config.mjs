import baseConfig from "@basestack/config/eslint.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Include the base configuration
  ...baseConfig,
  
  // Package-specific configuration
  {
    files: ["src/**/*.{js,ts,tsx}"],
    rules: {
      // Package-specific rule overrides can go here
    },
  },
  
  // Specific ignores for this package
  {
    ignores: [
      "dist/**",
      "*.config.{js,mjs,ts}",
    ],
  },
]; 