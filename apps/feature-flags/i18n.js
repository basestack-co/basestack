module.exports = {
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["navigation", "modals", "general"],
    "/": ["home"],
    "/[projectSlug]/flags": ["flags"],
    "/[projectSlug]/settings/general": ["settings"],
    "/[projectSlug]/settings/members": ["settings"],
    "/[projectSlug]/settings/environments": ["settings"],
    "/auth/sign-in": ["auth"],
    "/profile/settings": ["profile"],
  },
};
