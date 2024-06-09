import React, { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
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
import { AppEnv, config, Product } from "@basestack/utils";
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

  const currentForm = useMemo(() => {
    const form = data?.find(({ slug }) => slug === formId);

    return form?.text ?? "";
  }, [formId, data]);

  const onSelectApp = useCallback((app: Product) => {
    window.location.href = config.urls.getAppWithEnv(app, "production");
  }, []);

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
      apps={getAppsList(t, onSelectApp)}
      avatar={{
        name: session?.user.name || t("dropdown.username"),
        email: session?.user.email || "",
        src: session?.user.image || "",
        darkModeText: t("dropdown.dark-mode"),
        isDarkMode: isDarkMode,
        onSetDarkMode: setIsDarkMode,
        list: getAvatarDropdownList(t, router, () =>
          setCreateFormModalOpen({ isOpen: true }),
        ),
      }}
    />
  );
};

export default Navigation;
