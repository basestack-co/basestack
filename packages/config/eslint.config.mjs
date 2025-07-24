import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";

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
  {
    files: [
      "apps/*/app/**/*.{js,jsx,ts,tsx}",
      "apps/*/pages/**/*.{js,jsx,ts,tsx}",
      "apps/*/components/**/*.{js,jsx,ts,tsx}",
    ],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      ...reactHooks.configs.recommended.rules,
    },
  },
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
