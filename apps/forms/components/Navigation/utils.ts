import type { Role } from ".prisma/client";
import type { NavigationProps } from "@basestack/ui";
// Utils
import { config } from "@basestack/utils";
// Libs
import { auth } from "@basestack/vendors";
// Types
import type { useRouter } from "next/navigation";

const { hasPermission, PERMISSIONS } = config;

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
        !!formId && hasPermission(formRole, PERMISSIONS.FORM.SETUP.VIEW),
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
