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
import { type AppEnv, config, Product } from "@basestack/utils";
// Libs
import { auth } from "@basestack/vendors";
import { useParams, usePathname, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
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

  const { projectId } = useParams<{ projectId: string }>();

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
  );

  const setCreateMonitorModalOpen = useStore(
    (state) => state.setCreateMonitorModalOpen,
  );

  const [projectName, projectRole] = useMemo(() => {
    const project = data?.find(({ id }) => id === projectId) as unknown as {
      text: string;
      role: Role;
    };

    return [project?.text ?? "", project?.role ?? Role.VIEWER];
  }, [projectId, data]);

  const projectsList = useMemo((): Array<{
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
        isActive: item.id === projectId,
      })),
    });

    return [
      internal.length > 0 &&
        mapProjectsToSection(internal, t("navigation.projects.title")),
      external.length > 0 &&
        mapProjectsToSection(external, t("navigation.projects.external")),
    ].filter(Boolean) as Array<{
      title: string;
      items: PopupActionProps[];
    }>;
  }, [data, t, projectId]);

  const getProjectsProps = useMemo(() => {
    return {
      onCreate: () => setCreateProjectModalOpen({ isOpen: true }),
      current: projectName,
      data: projectsList,
      select: {
        title: t("navigation.projects.select"),
        create: t("navigation.create.project"),
      },
    };
  }, [projectName, projectsList, setCreateProjectModalOpen, t]);

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
        setCreateProjectModalOpen({ isOpen: true }),
      ),
    };
  }, [
    isDarkMode,
    session,
    t,
    router,
    setCreateProjectModalOpen,
    setIsDarkMode,
    toggleDarkMode,
  ]);

  const onSelectApp = useCallback((app: Product) => {
    window.location.href = config.urls.getAppWithEnv(app, AppMode as AppEnv);
  }, []);

  return (
    <NavigationUI
      product={Product.UPTIME}
      isMobile={isMobile}
      onClickLogo={() => router.push("/")}
      leftLinks={getLeftLinks(t, router, pathname, projectId, projectRole, () =>
        setCreateMonitorModalOpen({ isOpen: true }),
      )}
      rightLinks={getRightLinks({ docs: t("navigation.external.docs") })}
      rightLinksTitle={t("navigation.external.resources")}
      projects={getProjectsProps}
      appsTitle={t("navigation.apps.title")}
      apps={getAppsList(t, onSelectApp)}
      avatar={getAvatarProps}
    />
  );
};

export default Navigation;
