import type { Role } from ".prisma/client";
import type { NavigationProps } from "@basestack/ui";
// Utils
import { config, Product } from "@basestack/utils";
// Libs
import { auth } from "@basestack/vendors";
// Types
import type { useRouter } from "next/navigation";

const { hasFormsPermission } = config.plans;

export const getLeftLinks = (
  router: ReturnType<typeof useRouter>,
  pathname: string,
  formId: string,
  formRole: Role,
  labels: {
    submissions: string;
    setup: string;
    settings: string;
  },
): NavigationProps["leftLinks"] => {
  const links = [
    {
      type: "button",
      icon: "mail",
      onClick: () => router.push(`/a/form/${formId}/submissions`),
      text: labels.submissions,
      isActive: pathname.includes("submissions"),
      isVisible: !!formId,
    },
    {
      type: "button",
      icon: "tune",
      onClick: () => router.push(`/a/form/${formId}/setup`),
      text: labels.setup,
      isActive: pathname.includes("setup"),
      isVisible:
        !!formId && hasFormsPermission(formRole, "view_form_setup_page"),
    },
    {
      type: "button",
      icon: "settings",
      onClick: () => router.push(`/a/form/${formId}/settings/general`),
      text: labels.settings,
      isActive: pathname.includes("settings"),
      isVisible: !!formId,
    },
  ].filter((link) => link.isVisible);

  return links as NavigationProps["leftLinks"];
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
      onClick: async () =>
        await auth.client.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/auth/sign-in");
            },
          },
        }),
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
      onClick: () => onSelectApp(Product.FLAGS),
      product: Product.FLAGS,
      title: labels.flags.title,
      description: labels.flags.description,
      isActive: false,
    },
    {
      onClick: () => null,
      product: Product.FORMS,
      title: labels.forms.title,
      description: labels.forms.description,
      isActive: true,
    },
    {
      onClick: () => null,
      product: Product.UPTIME,
      title: labels.uptime.title,
      description: labels.uptime.description,
      isActive: true,
    },
  ];
};
