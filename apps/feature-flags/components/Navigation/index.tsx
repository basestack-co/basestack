"use client";

// Types
import { Role } from ".prisma/client";
// Components
import {
  Navigation as NavigationUI,
  type PopupActionProps,
} from "@basestack/ui";
// Utils
import { type AppEnv, config, Product } from "@basestack/utils";
// Vendors
import { auth } from "@basestack/vendors";
// Hooks
import { useParams, usePathname, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { flushSync } from "react-dom";
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
  const { data: session } = auth.client.useSession();
  const isMobile = useMedia(theme.device.max.lg, false);

  const { projectId } = useParams<{ projectId: string }>();

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setCreateProjectModalOpen = useStore(
    (state) => state.setCreateProjectModalOpen,
  );

  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen,
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

  const onSelectApp = useCallback((app: Product) => {
    window.location.href = config.urls.getAppWithEnv(app, AppMode as AppEnv);
  }, []);

  const toggleDarkMode = async (isDarkMode: boolean): Promise<void> => {
    /**
     * Return early if View Transition API is not supported
     * or user prefers reduced motion
     */
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDarkMode(isDarkMode);
      return;
    }

    // Start the view transition and toggle dark mode state
    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(isDarkMode);
      });
    }).ready;

    // Set the initial and final sizes of the rectangle
    const initialTop = 0; // Start from the top
    const initialRight = 0; // Start from the right
    const initialBottom = window.innerHeight; // Start with the full height
    const initialLeft = window.innerWidth; // Start with the full width

    // Animate the clip-path expanding from the top-right corner as a rectangle
    document.documentElement.animate(
      {
        clipPath: [
          `inset(${initialTop}px ${initialRight}px ${initialBottom}px ${initialLeft}px)`,
          `inset(0px 0px 0px 0px)`,
        ],
      },
      {
        duration: 400,
        easing: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <NavigationUI
      product={Product.FLAGS}
      isMobile={isMobile}
      onClickLogo={() => router.push("/")}
      leftLinks={getLeftLinks(
        router,
        pathname,
        projectId,
        projectRole,
        () => setCreateFlagModalOpen({ isOpen: true }),
        {
          createFlag: t("navigation.create.flag"),
          settings: t("navigation.internal.settings"),
          flags: t("navigation.internal.features"),
        },
      )}
      rightLinks={getRightLinks({ docs: t("navigation.external.docs") })}
      rightLinksTitle={t("navigation.external.resources")}
      projects={{
        onCreate: () => setCreateProjectModalOpen({ isOpen: true }),
        current: projectName,
        data: projectsList,
        select: {
          title: t("navigation.projects.select"),
          create: t("navigation.create.project"),
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
        onSetDarkMode: toggleDarkMode,
        list: getAvatarDropdownList(
          router,
          () => setCreateProjectModalOpen({ isOpen: true }),
          {
            project: t("navigation.create.project"),
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
