import type { Role } from ".prisma/client";
import type { NavigationProps } from "@basestack/ui";
// Utils
import { config } from "@basestack/utils";
// Libs
import { auth } from "@basestack/vendors";
// Types
import type { useRouter } from "next/navigation";

export const getLeftLinks = (
  t: (key: any) => string,
  router: ReturnType<typeof useRouter>,
  pathname: string,
  projectId: string,
  projectRole: Role
): NavigationProps["leftLinks"] => {
  if (!projectId) return [] as NavigationProps["leftLinks"];

  const config = [
    {
      key: "monitors",
      icon: "mail",
      path: "monitors",
    },
    {
      key: "incidents",
      icon: "tune",
      path: "incidents",
    },
    {
      key: "statusPage",
      icon: "mail",
      path: "status-page",
    },
    {
      key: "settings",
      icon: "settings",
      path: "settings/general",
    },
  ] as const;

  return config.map(({ key, icon, path }) => {
    const fullPath = `/a/project/${projectId}/${path}`;

    return {
      type: "button" as const,
      icon,
      onClick: () => router.push(fullPath),
      text: t(`navigation.internal.${key}`),
      isActive: pathname === fullPath,
      isVisible: true,
    };
  });
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
  onCreateForm: () => void
) => {
  return [
    {
      id: "1",
      icon: "add_circle",
      text: t("navigation.create.project"),
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
