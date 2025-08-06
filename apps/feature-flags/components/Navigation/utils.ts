import type { Role } from ".prisma/client";
import { ButtonVariant } from "@basestack/design-system";
import type { NavigationProps } from "@basestack/ui";
// Utils
import { config, Product } from "@basestack/utils";
// Vendors
import { auth } from "@basestack/vendors";
// Types
import type { useRouter } from "next/navigation";

const { hasPermission, PERMISSIONS } = config;

export const getLeftLinks = (
  t: (key: any) => string,
  router: ReturnType<typeof useRouter>,
  pathname: string,
  projectId: string,
  projectRole: Role,
  onCreateFlag: () => void
): NavigationProps["leftLinks"] => {
  const links = [
    {
      type: "button",
      icon: "flag",
      onClick: () => router.push(`/a/project/${projectId}/flags`),
      text: t("navigation.internal.features"),
      isActive: pathname.includes("flags"),
      isVisible: !!projectId,
    },
    {
      type: "button",
      icon: "settings",
      onClick: () => router.push(`/a/project/${projectId}/settings/general`),
      text: t("navigation.internal.settings"),
      isActive: pathname.includes("settings"),
      isVisible: !!projectId,
    },
    {
      type: "button",
      icon: "add",
      onClick: onCreateFlag,
      text: t("navigation.create.flag"),
      isActive: pathname.includes("create"),
      buttonVariant: ButtonVariant.Primary,
      space: { ml: 2 },
      isVisible:
        !!projectId &&
        hasPermission(projectRole, PERMISSIONS.PROJECT.FLAGS.CREATE),
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
      icon: "flag",
      isActive: false,
      href: config.urls.docs.flags.base,
      text: labels.docs,
    },
  ];
};

export const getAvatarDropdownList = (
  t: (key: any) => string,
  router: ReturnType<typeof useRouter>,
  onCreateProject: () => void
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
  onSelectApp: (app: Product) => void
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
    {
      onClick: () => onSelectApp(Product.UPTIME),
      product: Product.UPTIME,
      title: t("navigation.apps.uptime.title"),
      description: t("navigation.apps.uptime.description"),
      isActive: false,
    },
  ];
};
