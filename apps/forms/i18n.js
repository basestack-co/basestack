module.exports = {
  loadLocaleFrom: (lang, ns) =>
    import(`../../packages/locales/${lang}/${ns}.json`).then(
      (m) => m.default,
    ),
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "navigation", "modals"],
    "/auth/sign-in": ["auth"],
  },
};
