// Types
import { Translate } from "next-translate";
import { NextRouter } from "next/router";
// Utils
import { config } from "@basestack/utils";
import { signOut } from "next-auth/react";

export const getInternalLinks = (t: Translate, formId: string) => {
  return [
    {
      icon: "flag",
      activeText: "Submissions",
      to: `/form/${formId}/submissions`,
      text: t("internal.submissions"),
    },
    {
      icon: "flag",
      activeText: "Setup",
      to: `/form/${formId}/setup`,
      text: t("internal.setup"),
    },
    {
      icon: "settings",
      activeText: "Settings",
      to: `/form/${formId}/settings/general`,
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
