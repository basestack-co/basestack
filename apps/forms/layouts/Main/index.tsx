import React, { Fragment, useMemo } from "react";
import { useMedia } from "react-use";
// Locales
import useTranslation from "next-translate/useTranslation";
// Store
import { useStore } from "store";
// Router
import { NextRouter, useRouter } from "next/router";
// Auth
import { signOut, useSession } from "next-auth/react";
// Components
import { Splash, Loader } from "@basestack/design-system";
import { Navigation } from "@basestack/ui";
import NavigationOld from "components/Navigation";
// Server
import { trpc } from "libs/trpc";
import { useTheme } from "styled-components";
import { Translate } from "next-translate";
import { config } from "@basestack/utils";

const getInternalLinks = (router: NextRouter, t: Translate, formId: string) => {
  return [
    {
      onClick: () => router.push(`/form/${formId}/submissions`),
      text: t("internal.submissions"),
      isActive: router.pathname.includes("submissions"),
    },
    {
      onClick: () => router.push(`/form/${formId}/setup`),
      text: t("internal.setup"),
      isActive: router.pathname.includes("setup"),
    },
    {
      onClick: () => router.push(`/form/${formId}/settings/general`),
      text: t("internal.settings"),
      isActive: router.pathname.includes("settings"),
    },
  ];
};

const getExternalLinks = (t: Translate) => {
  return [
    {
      isExternal: true,
      isActive: false,
      href: config.urls.docs.flags.base,
      text: t("external.docs"),
    },
    {
      isExternal: true,
      isActive: false,
      href: config.urls.repo,
      text: t("external.github"),
    },
  ];
};

const getAvatarDropdownList = (
  t: Translate,
  router: NextRouter,
  onCreateForm: () => void,
) => {
  return [
    {
      icon: "add_circle",
      text: t("create.form"),
      onClick: onCreateForm,
      separator: true,
    },
    {
      icon: "settings",
      text: t("dropdown.settings"),
      onClick: () =>
        router.push({
          pathname: "/user/profile/settings",
        }),
    },
    {
      icon: "logout",
      text: t("dropdown.logout"),
      onClick: signOut,
    },
  ];
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation("navigation");
  const { data: session } = useSession();

  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.lg, false);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });

  const formId = router.query.formId as string;

  const { data, isLoading: isLoadingForms } = trpc.form.all.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
      select: (data) =>
        data?.forms.map((item) => ({
          id: item.id,
          slug: item.id,
          onClick: () =>
            router.push({
              pathname: "/form/[formId]/submissions",
              query: { formId: item.id },
            }),
          text: item.name,
        })),
    },
  );

  const setIsDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  const currentForm = useMemo(() => {
    const form = data?.find(({ slug }) => slug === formId);

    return form?.text ?? "";
  }, [formId, data]);

  if (status === "loading" || isLoadingForms) {
    return (
      <Loader hasDelay={false}>
        <Splash product="forms" />
      </Loader>
    );
  }

  return (
    <Fragment>
      <NavigationOld data={data} />

      <Navigation
        isMobile={isMobile}
        onClickLogo={() => router.push("/")}
        leftLinks={!!formId ? getInternalLinks(router, t, formId) : []}
        rightLinks={getExternalLinks(t)}
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
        apps={[
          {
            onClick: () => null,
            product: "forms",
            title: "Forms",
            description: "Basestack Forms",
            isActive: true,
          },
          {
            onClick: () => null,
            product: "flags",
            title: "Feature Flags",
            description: "Basestack Feature Flags",
            isActive: false,
          },
        ]}
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
        data={data}
      />

      {children}
    </Fragment>
  );
};

export default MainLayout;
