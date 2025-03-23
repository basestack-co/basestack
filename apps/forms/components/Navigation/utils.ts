import { NavigationProps } from "@basestack/ui";
// Types
import { useRouter } from "next/navigation";
// Utils
import { config, Product } from "@basestack/utils";
import { signOut } from "next-auth/react";

export const getLeftLinks = (
  router: ReturnType<typeof useRouter>,
  pathname: string,
  formId: string,
  labels: {
    submissions: string;
    setup: string;
    settings: string;
  },
): NavigationProps["leftLinks"] => {
  return [
    {
      type: "button",
      icon: "mail",
      onClick: () => router.push(`/a/form/${formId}/submissions`),
      text: labels.submissions,
      isActive: pathname.includes("submissions"),
    },
    {
      type: "button",
      icon: "tune",
      onClick: () => router.push(`/a/form/${formId}/setup`),
      text: labels.setup,
      isActive: pathname.includes("setup"),
    },
    {
      type: "button",
      icon: "settings",
      onClick: () => router.push(`/a/form/${formId}/settings/general`),
      text: labels.settings,
      isActive: pathname.includes("settings"),
    },
  ];
};

export const getRightLinks = (labels: {
  docs: string;
}): NavigationProps["rightLinks"] => {
  return [
    {
      type: "link",
      icon: "description",
      isActive: false,
      href: config.urls.docs.forms.base,
      text: labels.docs,
    },
  ];
};

export const getAvatarDropdownList = (
  router: ReturnType<typeof useRouter>,
  onCreateForm: () => void,
  labels: {
    createForm: string;
    settings: string;
    billing: string;
    logout: string;
  },
) => {
  return [
    {
      id: "1",
      icon: "add_circle",
      text: labels.createForm,
      onClick: onCreateForm,
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
      product: Product.FORMS,
      title: labels.forms.title,
      description: labels.forms.description,
      isActive: true,
    },
    {
      onClick: () => onSelectApp(Product.FLAGS),
      product: Product.FLAGS,
      title: labels.flags.title,
      description: labels.flags.description,
      isActive: false,
    },
  ];
};
