module.exports = {
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["navigation", "modals"],
    "/": ["home"],
    "/[projectSlug]/flags": ["flags"],
    "/[projectSlug]/settings/general": ["settings"],
    "/[projectSlug]/settings/members": ["settings"],
    "/[projectSlug]/settings/environments": ["settings"],
  },
};
