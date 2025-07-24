"use client";

// Types
import { Role } from ".prisma/client";
// Hooks
import { useDarkModeToggle } from "@basestack/hooks";
// Components
import { Navigation as NavigationUI, PopupActionProps } from "@basestack/ui";
// Utils
import { AppEnv, config, Product } from "@basestack/utils";
// Libs
import { auth } from "@basestack/vendors";
import { useParams, usePathname, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo } from "react";
import { useMedia } from "react-use";
// Store
import { useStore } from "store";
import { useTheme } from "styled-components";
import { AppMode } from "utils/helpers/general";
import {
  getAppsList,
  getAvatarDropdownList,
  getLeftLinks,
  getRightLinks,
} from "./utils";

export interface NavigationProps {
  data?: Array<PopupActionProps>;
}

const Navigation = ({ data }: NavigationProps) => {
  const theme = useTheme();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { toggleDarkMode } = useDarkModeToggle();
  const { data: session } = auth.client.useSession();
  const isMobile = useMedia(theme.device.max.lg, false);

  const { formId } = useParams<{ formId: string }>();

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  const [formName, formRole] = useMemo(() => {
    const form = data?.find(({ id }) => id === formId) as unknown as {
      text: string;
      role: Role;
    };

    return [form?.text ?? "", form?.role ?? Role.VIEWER];
  }, [formId, data]);

  const formsList = useMemo((): Array<{
    title: string;
    items: PopupActionProps[];
  }> => {
    if (!data?.length) return [];

    const { internal, external } = data.reduce(
      (acc, project) => {
        const target = (project as unknown as { isAdmin: boolean }).isAdmin
          ? acc.internal
          : acc.external;

        target.push(project as unknown as PopupActionProps);
        return acc;
      },
      { internal: [], external: [] } as {
        internal: PopupActionProps[];
        external: PopupActionProps[];
      },
    );

    const mapProjectsToSection = (
      items: PopupActionProps[],
      title: string,
    ) => ({
      title,
      items: items.map((item) => ({
        ...item,
        isActive: item.id === formId,
      })),
    });

    return [
      internal.length > 0 &&
        mapProjectsToSection(internal, t("navigation.forms.title")),
      external.length > 0 &&
        mapProjectsToSection(external, t("navigation.forms.external")),
    ].filter(Boolean) as Array<{
      title: string;
      items: PopupActionProps[];
    }>;
  }, [data, t, formId]);

  const onSelectApp = useCallback((app: Product) => {
    window.location.href = config.urls.getAppWithEnv(app, AppMode as AppEnv);
  }, []);

  const handleDarkModeToggle = () => {
    toggleDarkMode(!isDarkMode).then(() => {
      setIsDarkMode(!isDarkMode);
    });
  };

  return (
    <NavigationUI
      product={Product.FORMS}
      isMobile={isMobile}
      onClickLogo={() => router.push("/")}
      leftLinks={getLeftLinks(router, pathname, formId, formRole, {
        submissions: t("navigation.internal.submissions"),
        setup: t("navigation.internal.setup"),
        settings: t("navigation.internal.settings"),
      })}
      rightLinks={getRightLinks({ docs: t("navigation.external.docs") })}
      rightLinksTitle={t("navigation.external.resources")}
      projects={{
        onCreate: () => setCreateFormModalOpen({ isOpen: true }),
        current: formName,
        data: formsList,
        select: {
          title: t("navigation.forms.select"),
          create: t("navigation.create.form"),
        },
      }}
      appsTitle={t("navigation.apps.title")}
      apps={getAppsList(onSelectApp, {
        flags: {
          title: t("navigation.apps.flags.title"),
          description: t("navigation.apps.flags.description"),
        },
        forms: {
          title: t("navigation.apps.forms.title"),
          description: t("navigation.apps.forms.description"),
        },
      })}
      avatar={{
        name: session?.user.name || t("navigation.dropdown.username"),
        email: session?.user.email || "",
        src: session?.user.image || "",
        darkModeText: t("navigation.dropdown.dark-mode"),
        isDarkMode: isDarkMode,
        onSetDarkMode: handleDarkModeToggle,
        list: getAvatarDropdownList(
          router,
          () => setCreateFormModalOpen({ isOpen: true }),
          {
            createForm: t("navigation.create.form"),
            settings: t("navigation.dropdown.settings"),
            billing: t("navigation.dropdown.billing"),
            logout: t("navigation.dropdown.logout"),
          },
        ),
      }}
    />
  );
};

export default Navigation;
