module.exports = {
  loadLocaleFrom: (lang, ns) =>
    import(`../../packages/locales/forms/${lang}/${ns}.json`).then(
      (m) => m.default,
    ),
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "navigation"],
    "/auth/sign-in": ["auth"],
  },
};
