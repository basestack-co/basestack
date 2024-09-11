import React, { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import { flushSync } from "react-dom";
// Store
import { useStore } from "store";
// Hooks
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useMedia } from "react-use";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { PopupActionProps } from "@basestack/design-system";
import { Navigation as NavigationUI } from "@basestack/ui";
// Utils
import { config, getCookieValueAsBoolean, Product } from "@basestack/utils";
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
  const { t } = useTranslation("navigation");
  const router = useRouter();
  const { data: session } = useSession();
  const isMobile = useMedia(theme.device.max.lg, false);

  const formId = router.query.formId as string;

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  const useBilling = useMemo(
    () => getCookieValueAsBoolean(config.cookies.useBilling) || config.isDev,
    [],
  );

  const currentForm = useMemo(() => {
    const form = data?.find(({ slug }) => slug === formId);

    return form?.text ?? "";
  }, [formId, data]);

  const onSelectApp = useCallback((app: Product) => {
    window.location.href = config.urls.getAppWithEnv(app, "production");
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
      product={Product.FORMS}
      isMobile={isMobile}
      onClickLogo={() => router.push("/")}
      leftLinks={!!formId ? getLeftLinks(router, t, formId) : []}
      rightLinks={getRightLinks(t)}
      rightLinksTitle={t("external.resources")}
      projects={{
        onCreate: () => setCreateFormModalOpen({ isOpen: true }),
        current: currentForm,
        data: data ?? [],
        title: t("forms.title"),
        select: {
          title: t("forms.select"),
          create: t("create.form"),
        },
      }}
      appsTitle={t("apps.title")}
      // apps={getAppsList(t, onSelectApp)}
      avatar={{
        name: session?.user.name || t("dropdown.username"),
        email: session?.user.email || "",
        src: session?.user.image || "",
        darkModeText: t("dropdown.dark-mode"),
        isDarkMode: isDarkMode,
        onSetDarkMode: toggleDarkMode,
        list: getAvatarDropdownList(t, router, () =>
          setCreateFormModalOpen({ isOpen: true }),
        ).filter((link) => link.id === "3" || useBilling),
      }}
    />
  );
};

export default Navigation;
