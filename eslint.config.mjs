import baseConfig from "./packages/config/eslint.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Include the base configuration
  ...baseConfig,
  
  // Root-level configuration can go here if needed
  {
    files: ["*.{js,mjs,ts}"],
    rules: {
      // Root-level rule overrides can go here
    },
  },
]; 