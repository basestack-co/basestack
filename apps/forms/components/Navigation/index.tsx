"use client";

import React, { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import { flushSync } from "react-dom";
// Store
import { useStore } from "store";
// Hooks
import { useDarkModeToggle } from "@basestack/hooks";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMedia } from "react-use";
// Locales
import { useTranslations } from "next-intl";
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
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { toggleDarkMode } = useDarkModeToggle();
  const { data: session } = useSession();
  const isMobile = useMedia(theme.device.max.lg, false);

  const { formId } = useParams<{ formId: string }>();

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
      leftLinks={!!formId ? getLeftLinks(router, pathname, t, formId) : []}
      rightLinks={getRightLinks(t)}
      rightLinksTitle={t("navigation.external.resources")}
      projects={{
        onCreate: () => setCreateFormModalOpen({ isOpen: true }),
        current: currentForm,
        data: data ?? [],
        title: t("navigation.forms.title"),
        select: {
          title: t("navigation.forms.select"),
          create: t("navigation.create.form"),
        },
      }}
      appsTitle={t("navigation.apps.title")}
      // apps={getAppsList(t, onSelectApp)}
      avatar={{
        name: session?.user.name || t("navigation.dropdown.username"),
        email: session?.user.email || "",
        src: session?.user.image || "",
        darkModeText: t("navigation.dropdown.dark-mode"),
        isDarkMode: isDarkMode,
        onSetDarkMode: handleDarkModeToggle,
        list: getAvatarDropdownList(t, router, () =>
          setCreateFormModalOpen({ isOpen: true }),
        ).filter((item) => !(item.id === "3" && !useBilling)),
      }}
    />
  );
};

export default Navigation;
