import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Base JavaScript recommended config
  js.configs.recommended,
  
  // TypeScript configs for .ts/.tsx files
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"]
  })),
  
  // Prettier config (must be last to override other configs)
  prettierConfig,
  
  // Project-specific configuration
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/no-empty-function": "off",
      "no-console": ["warn", { allow: ["error", "info"] }],
      "no-extra-semi": "error",
      "no-duplicate-imports": "error",
      "prefer-const": "warn",
      "eqeqeq": "error",
      "no-unused-expressions": "warn",
      "no-prototype-builtins": "warn", // Relax this rule
    },
  },
  
  // TypeScript-specific rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_" 
      }],
      // Relax some stricter ESLint 9 rules for gradual migration
      "@typescript-eslint/no-explicit-any": "warn", // Changed from error to warn
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn", // Changed from error to warn
      "@typescript-eslint/ban-ts-comment": "warn", // Changed from error to warn
      "@typescript-eslint/no-empty-object-type": "warn", // Changed from error to warn
    },
  },
  
  // Next.js specific configuration for apps
  {
    files: ["apps/*/app/**/*.{js,jsx,ts,tsx}", "apps/*/pages/**/*.{js,jsx,ts,tsx}", "apps/*/components/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      // Next.js specific rules can be added here
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      ...reactHooks.configs.recommended.rules,
    },
  },
  
  // Global ignores
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/.swc/**",
      "**/out/**",
    ],
  },
]; 