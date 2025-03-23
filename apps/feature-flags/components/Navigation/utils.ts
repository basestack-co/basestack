import { NavigationProps } from "@basestack/ui";
// Types
import { useRouter } from "next/navigation";
import { ButtonVariant } from "@basestack/design-system";
// Utils
import { config, Product } from "@basestack/utils";
import { signOut } from "next-auth/react";

export const getLeftLinks = (
  router: ReturnType<typeof useRouter>,
  pathname: string,
  projectId: string,
  onCreateFlag: () => void,
  labels: {
    flags: string;
    settings: string;
    createFlag: string;
  },
): NavigationProps["leftLinks"] => {
  return [
    {
      type: "button",
      icon: "flag",
      onClick: () => router.push(`/a/project/${projectId}/flags`),
      text: labels.flags,
      isActive: pathname.includes("flags"),
    },
    {
      type: "button",
      icon: "settings",
      onClick: () => router.push(`/a/project/${projectId}/settings/general`),
      text: labels.settings,
      isActive: pathname.includes("settings"),
    },
    {
      type: "button",
      icon: "add",
      onClick: onCreateFlag,
      text: labels.createFlag,
      isActive: pathname.includes("create"),
      buttonVariant: ButtonVariant.Primary,
      space: { ml: 2 },
    },
  ];
};

export const getRightLinks = (labels: {
  docs: string;
}): NavigationProps["rightLinks"] => {
  return [
    {
      type: "link",
      icon: "flag",
      isActive: false,
      href: config.urls.docs.forms.base,
      text: labels.docs,
    },
  ];
};

export const getAvatarDropdownList = (
  router: ReturnType<typeof useRouter>,
  onCreateProject: () => void,
  labels: {
    project: string;
    settings: string;
    billing: string;
    logout: string;
  },
) => {
  return [
    {
      id: "1",
      icon: "add_circle",
      text: labels.project,
      onClick: onCreateProject,
      separator: true,
    },
    {
      id: "2",
      icon: "settings",
      text: labels.settings,
      onClick: () => router.push("/a/user/tab/general"),
    },
    {
      id: "3",
      icon: "credit_card",
      text: labels.billing,
      onClick: () => router.push("/a/user/tab/billing"),
    },
    {
      id: "4",
      icon: "logout",
      text: labels.logout,
      onClick: signOut,
    },
  ];
};

export const getAppsList = (
  onSelectApp: (app: Product) => void,
  labels: {
    flags: {
      title: string;
      description: string;
    };
    forms: {
      title: string;
      description: string;
    };
  },
) => {
  return [
    {
      onClick: () => null,
      product: Product.FLAGS,
      title: labels.flags.title,
      description: labels.flags.description,
      isActive: true,
    },
    {
      onClick: () => onSelectApp(Product.FORMS),
      product: Product.FORMS,
      title: labels.forms.title,
      description: labels.forms.description,
      isActive: false,
    },
  ];
};
