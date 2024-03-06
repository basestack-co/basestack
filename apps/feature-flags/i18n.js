module.exports = {
  loadLocaleFrom: (lang, ns) =>
    import(`../../packages/locales/${lang}/${ns}.json`).then(
      (m) => m.default,
    ),
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["navigation", "modals", "common"],
    "/": ["home"],
    "/[projectSlug]/flags": ["flags"],
    "/[projectSlug]/settings/general": ["settings"],
    "/[projectSlug]/settings/members": ["settings"],
    "/[projectSlug]/settings/environments": ["settings"],
    "/auth/sign-in": ["auth"],
    "/profile/settings": ["profile"],
  },
};
