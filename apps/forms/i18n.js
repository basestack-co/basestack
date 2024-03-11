module.exports = {
  loadLocaleFrom: (lang, ns) =>
    import(`../../packages/locales/${lang}/${ns}.json`).then((m) => m.default),
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "navigation", "modals"],
    "/": ["home"],
    "/auth/sign-in": ["auth"],
    "/[formId]/submissions": ["flags"],
    "/[formId]/settings/general": ["settings"],
    "/user/profile/settings": ["profile"],
  },
};
