import { NavigationProps } from "@basestack/ui";
// Types
import { useRouter } from "next/navigation";
import { TFunction } from "types/locale";
// Utils
import { config, Product } from "@basestack/utils";
import { signOut } from "next-auth/react";

export const getLeftLinks = (
  router: ReturnType<typeof useRouter>,
  pathname: string,
  t: TFunction,
  formId: string,
): NavigationProps["leftLinks"] => {
  return [
    {
      type: "button",
      icon: "mail",
      onClick: () => router.push(`/hub/form/${formId}/submissions`),
      text: t("navigation.internal.submissions"),
      isActive: pathname.includes("submissions"),
    },
    {
      type: "button",
      icon: "tune",
      onClick: () => router.push(`/hub/form/${formId}/setup`),
      text: t("navigation.internal.setup"),
      isActive: pathname.includes("setup"),
    },
    {
      type: "button",
      icon: "settings",
      onClick: () => router.push(`/hub/form/${formId}/settings/general`),
      text: t("navigation.internal.settings"),
      isActive: pathname.includes("settings"),
    },
  ];
};

export const getRightLinks = (t: TFunction): NavigationProps["rightLinks"] => {
  return [
    {
      type: "link",
      icon: "description",
      isActive: false,
      href: config.urls.docs.flags.base,
      text: t("navigation.external.docs"),
    },
    {
      type: "link",
      icon: "link",
      isActive: false,
      href: config.urls.repo,
      text: t("navigation.external.github"),
    },
  ];
};

export const getAvatarDropdownList = (
  t: TFunction,
  router: ReturnType<typeof useRouter>,
  onCreateForm: () => void,
) => {
  return [
    {
      id: "1",
      icon: "add_circle",
      text: t("navigation.create.form"),
      onClick: onCreateForm,
      separator: true,
    },
    {
      id: "2",
      icon: "settings",
      text: t("navigation.dropdown.settings"),
      onClick: () => router.push("/hub/user/tab/general"),
    },
    {
      id: "3",
      icon: "credit_card",
      text: t("navigation.dropdown.billing"),
      onClick: () => router.push("/hub/user/tab/billing"),
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
      product: Product.FORMS,
      title: t("navigation.apps.forms.title"),
      description: t("navigation.apps.forms.description"),
      isActive: true,
    },
    {
      onClick: () => onSelectApp(Product.FLAGS),
      product: Product.FLAGS,
      title: t("navigation.apps.flags.title"),
      description: t("navigation.apps.flags.description"),
      isActive: false,
    },
  ];
};
