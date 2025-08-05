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
  t: (key: any) => string,
  router: ReturnType<typeof useRouter>,
  pathname: string,
  formId: string,
  formRole: Role,
): NavigationProps["leftLinks"] => {
  const links = [
    {
      type: "button",
      icon: "mail",
      onClick: () => router.push(`/a/form/${formId}/submissions`),
      text: t("navigation.internal.submissions"),
      isActive: pathname.includes("submissions"),
      isVisible: !!formId,
    },
    {
      type: "button",
      icon: "tune",
      onClick: () => router.push(`/a/form/${formId}/setup`),
      text: t("navigation.internal.setup"),
      isActive: pathname.includes("setup"),
      isVisible:
        !!formId && hasFormsPermission(formRole, "view_form_setup_page"),
    },
    {
      type: "button",
      icon: "settings",
      onClick: () => router.push(`/a/form/${formId}/settings/general`),
      text: t("navigation.internal.settings"),
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
  t: (key: any) => string,
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
  t: (key: any) => string,
  onSelectApp: (app: Product) => void,
) => {
  return [
    {
      onClick: () => onSelectApp(Product.FLAGS),
      product: Product.FLAGS,
      title: t("navigation.apps.flags.title"),
      description: t("navigation.apps.flags.description"),
      isActive: false,
    },
    {
      onClick: () => null,
      product: Product.FORMS,
      title: t("navigation.apps.forms.title"),
      description: t("navigation.apps.forms.description"),
      isActive: true,
    },
    {
      onClick: () => onSelectApp(Product.UPTIME),
      product: Product.UPTIME,
      title: t("navigation.apps.uptime.title"),
      description: t("navigation.apps.uptime.description"),
      isActive: false,
    },
  ];
};
