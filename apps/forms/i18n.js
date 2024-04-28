module.exports = {
  loadLocaleFrom: (lang, ns) =>
    import(`../../packages/locales/${lang}/${ns}.json`).then((m) => m.default),
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "navigation", "modals"],
    "/": ["home"],
    "/auth/sign-in": ["auth"],
    "/form/[formId]/submissions": ["forms"],
    "/form/[formId]/setup": ["forms"],
    "/form/[formId]/settings/general": ["settings"],
    "/form/[formId]/settings/security": ["settings"],
    "/form/[formId]/settings/customization": ["settings"],
    "/form/[formId]/settings/notifications": ["settings"],
    "/user/profile/settings": ["profile"],
  },
};
