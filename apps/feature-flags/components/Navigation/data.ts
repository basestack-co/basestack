// Utils
import { DOCS_URL, GITHUB_REPO_URL } from "utils/helpers/constants";

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
    to: DOCS_URL,
    isExternal: true,
  },
  {
    icon: "link",
    text: "Github",
    to: GITHUB_REPO_URL,
    isExternal: true,
  },
];
