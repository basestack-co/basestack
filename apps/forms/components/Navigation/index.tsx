"use client";

// Types
import { Role } from ".prisma/client";
// Hooks
import { useDarkModeToggle } from "@basestack/hooks";
// Components
import {
  Navigation as NavigationUI,
  type PopupActionProps,
} from "@basestack/ui";
// Utils
import { type AppEnv, config, getAppsList, Product } from "@basestack/utils";
// Libs
import { auth } from "@basestack/vendors";
import { useParams, usePathname, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// React
import { useMemo } from "react";
import { useMedia } from "react-use";
// Store
import { useStore } from "store";
import { useTheme } from "styled-components";
import { AppMode } from "utils/helpers/general";
import { getAvatarDropdownList, getLeftLinks, getRightLinks } from "./utils";

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

  const leftLinks = useMemo(() => {
    return getLeftLinks(t, router, pathname, formId, formRole);
  }, [t, router, pathname, formId, formRole]);

  const rightLinks = useMemo(() => {
    return getRightLinks({ docs: t("navigation.external.docs") });
  }, [t]);

  const apps = useMemo(() => {
    return getAppsList(
      t,
      (app) => {
        window.location.href = config.urls.getAppWithEnv(
          app,
          AppMode as AppEnv,
        );
      },
      Product.FORMS,
    );
  }, [t]);

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

  const getProjectsProps = useMemo(() => {
    return {
      onCreate: () => setCreateFormModalOpen({ isOpen: true }),
      current: formName,
      data: formsList,
      select: {
        title: t("navigation.forms.select"),
        create: t("navigation.create.form"),
      },
    };
  }, [formName, formsList, setCreateFormModalOpen, t]);

  const getAvatarProps = useMemo(() => {
    return {
      name: session?.user.name || t("navigation.dropdown.username"),
      email: session?.user.email || "",
      src: session?.user.image || "",
      darkModeText: t("navigation.dropdown.dark-mode"),
      isDarkMode: isDarkMode,
      onSetDarkMode: () =>
        toggleDarkMode(!isDarkMode).then(() => {
          setIsDarkMode(!isDarkMode);
        }),
      list: getAvatarDropdownList(t, router, () =>
        setCreateFormModalOpen({ isOpen: true }),
      ),
    };
  }, [
    session,
    t,
    isDarkMode,
    router,
    setCreateFormModalOpen,
    setIsDarkMode,
    toggleDarkMode,
  ]);

  return (
    <NavigationUI
      product={Product.FORMS}
      isMobile={isMobile}
      onClickLogo={() => router.push("/")}
      leftLinks={leftLinks}
      rightLinks={rightLinks}
      rightLinksTitle={t("navigation.external.resources")}
      projects={getProjectsProps}
      appsTitle={t("navigation.apps.title")}
      apps={apps}
      avatar={getAvatarProps}
    />
  );
};

export default Navigation;
