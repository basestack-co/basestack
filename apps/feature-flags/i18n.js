module.exports = {
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["navigation"],
    "/": ["home", "modals"],
    "/[projectSlug]/flags": ["flags", "modals"],
    "/[projectSlug]/settings/general": ["settings", "modals"],
    "/[projectSlug]/settings/members": ["settings", "modals"],
    "/[projectSlug]/settings/environments": ["settings", "modals"],
  },
};
