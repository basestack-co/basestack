import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  prettierConfig,
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
      eqeqeq: "error",
      "no-unused-expressions": "warn",
      "no-prototype-builtins": "warn",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  ...fixupConfigRules([
    ...compat.extends("next/core-web-vitals"),
  ]).map(config => ({
    ...config,
    files: [
      "apps/*/app/**/*.{js,jsx,ts,tsx}",
      "apps/*/pages/**/*.{js,jsx,ts,tsx}",
      "apps/*/components/**/*.{js,jsx,ts,tsx}",
      "apps/*/modals/**/*.{js,jsx,ts,tsx}",
      "apps/*/utils/**/*.{js,jsx,ts,tsx}",
      "apps/*/store/**/*.{js,jsx,ts,tsx}",
    ],
    settings: {
      next: {
        rootDir: ["apps/*/"],
      },
    },
  })),
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
