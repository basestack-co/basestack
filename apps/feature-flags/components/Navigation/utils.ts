import { NavigationProps } from "@basestack/ui";
// Types
import { useRouter } from "next/navigation";
import { TFunction } from "types/locale";
import { ButtonVariant } from "@basestack/design-system";
// Utils
import { config, Product } from "@basestack/utils";
import { signOut } from "next-auth/react";

export const getLeftLinks = (
  router: ReturnType<typeof useRouter>,
  pathname: string,
  t: TFunction,
  projectId: string,
  onCreateFlag: () => void,
): NavigationProps["leftLinks"] => {
  return [
    {
      type: "button",
      icon: "flag",
      onClick: () => router.push(`/a/project/${projectId}/flags`),
      text: t("navigation.internal.features"),
      isActive: pathname.includes("flags"),
    },
    {
      type: "button",
      icon: "settings",
      onClick: () => router.push(`/a/project/${projectId}/settings/general`),
      text: t("navigation.internal.settings"),
      isActive: pathname.includes("settings"),
    },
    {
      type: "button",
      icon: "settings",
      onClick: onCreateFlag,
      text: t("navigation.create.flag"),
      isActive: pathname.includes("create"),
      buttonVariant: ButtonVariant.Primary,
      space: { ml: 2 },
    },
  ];
};

export const getRightLinks = (t: TFunction): NavigationProps["rightLinks"] => {
  return [
    {
      type: "link",
      icon: "flag",
      isActive: false,
      href: config.urls.docs.forms.base,
      text: t("navigation.external.docs"),
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
      id: "1",
      icon: "add_circle",
      text: t("navigation.create.project"),
      onClick: onCreateProject,
      separator: true,
    },
    {
      id: "2",
      icon: "settings",
      text: t("navigation.dropdown.settings"),
      onClick: () => router.push("/a/user/tab/general"),
    },
    {
      id: "3",
      icon: "credit_card",
      text: t("navigation.dropdown.billing"),
      onClick: () => router.push("/a/user/tab/billing"),
    },
    {
      id: "4",
      icon: "logout",
      text: t("navigation.dropdown.logout"),
      onClick: signOut,
    },
  ];
};

export const getAppsList = (
  t: TFunction,
  onSelectApp: (app: Product) => void,
) => {
  return [
    {
      onClick: () => null,
      product: Product.FLAGS,
      title: t("navigation.apps.flags.title"),
      description: t("navigation.apps.flags.description"),
      isActive: true,
    },
    {
      onClick: () => onSelectApp(Product.FORMS),
      product: Product.FORMS,
      title: t("navigation.apps.forms.title"),
      description: t("navigation.apps.forms.description"),
      isActive: false,
    },
  ];
};
