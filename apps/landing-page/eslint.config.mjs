import baseConfig from "@basestack/config/eslint.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Include the base configuration
  ...baseConfig,
  
  // App-specific configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // App-specific rule overrides can go here
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  
  // Specific ignores for this app
  {
    ignores: [
      ".next/**",
      "out/**",
      "public/**",
      "*.config.{js,mjs,ts}",
    ],
  },
]; 