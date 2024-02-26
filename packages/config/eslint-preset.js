module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/no-empty-function": "off",
    "no-console": "warn",
    "no-extra-semi": "error",
    "no-duplicate-imports": "error",
    "prefer-const": "warn",
    eqeqeq: "error",
    "no-unused-expressions": "warn",
  },
};
