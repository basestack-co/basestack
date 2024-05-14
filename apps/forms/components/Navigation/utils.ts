import { NavigationProps } from "@basestack/ui";
// Types
import { Translate } from "next-translate";
import { NextRouter } from "next/router";
// Utils
import { config } from "@basestack/utils";
import { signOut } from "next-auth/react";

export const getLeftLinks = (
  router: NextRouter,
  t: Translate,
  formId: string,
): NavigationProps["leftLinks"] => {
  return [
    {
      type: "button",
      icon: "mail",
      onClick: () => router.push(`/form/${formId}/submissions`),
      text: t("internal.submissions"),
      isActive: router.pathname.includes("submissions"),
    },
    {
      type: "button",
      icon: "tune",
      onClick: () => router.push(`/form/${formId}/setup`),
      text: t("internal.setup"),
      isActive: router.pathname.includes("setup"),
    },
    {
      type: "button",
      icon: "settings",
      onClick: () => router.push(`/form/${formId}/settings/general`),
      text: t("internal.settings"),
      isActive: router.pathname.includes("settings"),
    },
  ];
};

export const getRightLinks = (t: Translate): NavigationProps["rightLinks"] => {
  return [
    {
      type: "link",
      icon: "description",
      isActive: false,
      href: config.urls.docs.flags.base,
      text: t("external.docs"),
    },
    {
      type: "link",
      icon: "link",
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
          pathname: "/user/profile/general",
        }),
    },
    {
      icon: "credit_card",
      text: t("dropdown.billing"),
      onClick: () =>
        router.push({
          pathname: "/user/profile/billing",
        }),
    },
    {
      icon: "logout",
      text: t("dropdown.logout"),
      onClick: signOut,
    },
  ];
};
