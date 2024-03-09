// Types
import { Translate } from "next-translate";
import { NextRouter } from "next/router";
// Utils
import { config } from "@basestack/utils";
import { signOut } from "next-auth/react";

export const getInternalLinks = (t: Translate, projectSlug: string) => {
  return [
    {
      icon: "flag",
      activeText: "Features",
      to: `/${projectSlug}/flags`,
      text: t("internal.features"),
    },
    {
      icon: "settings",
      activeText: "Settings",
      to: `/${projectSlug}/settings/general`,
      text: t("internal.settings"),
    },
  ];
};

export const getExternalLinks = (t: Translate) => {
  return [
    {
      icon: "description",
      activeText: "Documentation",
      to: config.urls.docs.flags.base,
      isExternal: true,
      text: t("external.docs"),
    },
    {
      icon: "link",
      activeText: "Github",
      to: config.urls.repo,
      isExternal: true,
      text: t("external.github"),
    },
  ];
};

export const getAvatarDropdownList = (t: Translate, router: NextRouter) => {
  return [
    {
      icon: "add_circle",
      text: t("create.project"),
    },
    {
      icon: "group_add",
      text: t("dropdown.invite"),
      isDisabled: true,
      separator: true,
    },
    {
      icon: "settings",
      text: t("dropdown.settings"),
      onClick: () =>
        router.push({
          pathname: "/profile/settings",
        }),
    },
    {
      icon: "logout",
      text: t("dropdown.logout"),
      onClick: signOut,
    },
  ];
};
