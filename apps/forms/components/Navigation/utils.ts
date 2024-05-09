// Types
import { Translate } from "next-translate";
import { NextRouter } from "next/router";
// Utils
import { config } from "@basestack/utils";
import { signOut } from "next-auth/react";

export const getInternalLinks = (
  router: NextRouter,
  t: Translate,
  formId: string,
) => {
  return [
    {
      icon: "mail",
      onClick: () => router.push(`/form/${formId}/submissions`),
      text: t("internal.submissions"),
      isActive: router.pathname.includes("submissions"),
    },
    {
      icon: "tune",
      onClick: () => router.push(`/form/${formId}/setup`),
      text: t("internal.setup"),
      isActive: router.pathname.includes("setup"),
    },
    {
      icon: "settings",
      onClick: () => router.push(`/form/${formId}/settings/general`),
      text: t("internal.settings"),
      isActive: router.pathname.includes("settings"),
    },
  ];
};

export const getExternalLinks = (t: Translate) => {
  return [
    {
      icon: "description",
      isExternal: true,
      isActive: false,
      href: config.urls.docs.flags.base,
      text: t("external.docs"),
    },
    {
      icon: "link",
      isExternal: true,
      isActive: false,
      href: config.urls.repo,
      text: t("external.github"),
    },
  ];
};

export const getAvatarDropdownList = (
  t: Translate,
  router: NextRouter,
  onCreateForm: () => void,
) => {
  return [
    {
      icon: "add_circle",
      text: t("create.form"),
      onClick: onCreateForm,
      separator: true,
    },
    {
      icon: "settings",
      text: t("dropdown.settings"),
      onClick: () =>
        router.push({
          pathname: "/user/profile/settings",
        }),
    },
    {
      icon: "logout",
      text: t("dropdown.logout"),
      onClick: signOut,
    },
  ];
};
