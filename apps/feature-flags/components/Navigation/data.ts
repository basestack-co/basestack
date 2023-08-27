// Utils
import { config } from "@basestack/utils";

export const internalLinks = [
  {
    icon: "flag",
    text: "Features",
    to: "/[projectSlug]/flags",
    i18nKey: "internal.features",
  },
  {
    icon: "settings",
    text: "Settings",
    to: "/[projectSlug]/settings/general",
    i18nKey: "internal.settings",
  },
];

export const externalLinks = [
  {
    icon: "description",
    text: "Documentation",
    to: config.urls.docs.flags.base,
    isExternal: true,
    i18nKey: "external.docs",
  },
  {
    icon: "link",
    text: "Github",
    to: config.urls.repo,
    isExternal: true,
    i18nKey: "external.github",
  },
];
