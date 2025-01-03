// Types
import { useRouter } from "next/navigation";
import { TFunction } from "types/locale";
// Utils
import { config } from "@basestack/utils";
import { signOut } from "next-auth/react";

export const getInternalLinks = (t: TFunction, projectId: string) => {
  return [
    {
      icon: "flag",
      activeText: "Flags",
      to: `/a/project/${projectId}/flags`,
      text: t("navigation.internal.features"),
    },
    {
      icon: "settings",
      activeText: "Settings",
      to: `/a/project/${projectId}/settings/general`,
      text: t("navigation.internal.settings"),
    },
  ];
};

export const getExternalLinks = (t: TFunction) => {
  return [
    {
      icon: "description",
      activeText: "Documentation",
      to: config.urls.docs.flags.base,
      isExternal: true,
      text: t("navigation.external.docs"),
    },
    {
      icon: "link",
      activeText: "Github",
      to: config.urls.repo,
      isExternal: true,
      text: t("navigation.external.github"),
    },
  ];
};

export const getAvatarDropdownList = (
  t: TFunction,
  router: ReturnType<typeof useRouter>,
  onCreateProject: () => void,
) => {
  return [
    {
      icon: "add_circle",
      text: t("navigation.create.project"),
      onClick: onCreateProject,
    },
    {
      icon: "group_add",
      text: t("navigation.dropdown.invite"),
      isDisabled: true,
      separator: true,
    },
    {
      icon: "settings",
      text: t("navigation.dropdown.settings"),
      onClick: () => router.push("/a/user/tab/general"),
    },
    {
      icon: "logout",
      text: t("navigation.dropdown.logout"),
      onClick: signOut,
    },
  ];
};
