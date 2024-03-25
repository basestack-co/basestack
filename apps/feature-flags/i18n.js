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
    "/project/[projectId]/flags": ["flags"],
    "/project/[projectId]/settings/general": ["settings"],
    "/project/[projectId]/settings/members": ["settings"],
    "/project/[projectId]/settings/environments": ["settings"],
    "/auth/sign-in": ["auth"],
    "/user/profile/settings": ["profile"],
  },
};
