// Utils
import { config } from "@basestack/utils";

export const internalLinks = [
  {
    icon: "flag",
    text: "Features",
    to: "/[projectSlug]/flags",
  },
  {
    icon: "settings",
    text: "Settings",
    to: "/[projectSlug]/settings/general",
  },
];

export const externalLinks = [
  {
    icon: "description",
    text: "Documentation",
    to: config.urls.docs.base,
    isExternal: true,
  },
  {
    icon: "link",
    text: "Github",
    to: config.urls.repo,
    isExternal: true,
  },
];
