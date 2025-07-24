"use client";

// types
import { Role } from ".prisma/client";
// Components
import { Loader, Skeleton, Tabs, Text } from "@basestack/design-system";
// Utils
import { config } from "@basestack/utils";
// Router
import { useParams, usePathname, useRouter } from "next/navigation";
// Locales
import { NamespaceKeys, useTranslations } from "next-intl";
import React, { useEffect, useMemo } from "react";
// Hooks
import { useMedia } from "react-use";
// Theme
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
import {
  Container,
  List,
  ListItem,
  SettingsContainer,
  StyledButton,
  StyledLink,
} from "./styles";

const { hasFormsPermission } = config.plans;

const getLinks = (formId: string, role: Role | undefined) => [
  {
    id: "1",
    i18nKey: "navigation.setting.general",
    tab: "general",
    href: `/a/form/${formId}/settings/general`,
    isVisible: true,
  },
  {
    id: "2",
    i18nKey: "navigation.setting.members",
    tab: "members",
    href: `/a/form/${formId}/settings/members`,
    isVisible: true,
  },
  {
    id: "3",
    i18nKey: "navigation.setting.security",
    tab: "security",
    href: `/a/form/${formId}/settings/security`,
    isVisible: hasFormsPermission(role, "view_form_security_settings"),
  },
  {
    id: "4",
    i18nKey: "navigation.setting.customization",
    tab: "customization",
    href: `/a/form/${formId}/settings/customization`,
    isVisible: hasFormsPermission(role, "view_form_customization_settings"),
  },
  {
    id: "5",
    i18nKey: "navigation.setting.notifications",
    tab: "notifications",
    href: `/a/form/${formId}/settings/notifications`,
    isVisible: hasFormsPermission(role, "view_form_notifications_settings"),
  },
];

const SettingsLayout = ({ children }: { children: React.ReactElement }) => {
  const t = useTranslations();
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const router = useRouter();
  const pathname = usePathname();
  const { formId } = useParams<{ formId: string }>();

  const { data, isLoading: isLoadingForm } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  const renderLink = useMemo(() => {
    return getLinks(formId, data?.role)
      .filter((link) => link.isVisible)
      .map(({ id, i18nKey, href }) => (
        <ListItem key={`settings-button-list-${id}`}>
          <StyledLink href={href} passHref>
            <StyledButton isActive={pathname === href}>
              {t(i18nKey as NamespaceKeys<string, "navigation">)}
            </StyledButton>
          </StyledLink>
        </ListItem>
      ));
  }, [pathname, formId, t, data?.role]);

  const activeLinkIndex = useMemo(
    () =>
      getLinks(formId, data?.role).findIndex(
        (button) => button.href === pathname,
      ),
    [pathname, formId, data?.role],
  );

  const items = useMemo(
    () =>
      getLinks(formId, data?.role)
        .filter((link) => link.isVisible)
        .map(({ i18nKey, tab }) => {
          return {
            id: tab.toLowerCase(),
            text: t(i18nKey as NamespaceKeys<string, "navigation">),
          };
        }),
    [t, formId, data?.role],
  );

  useEffect(() => {
    document.title = `${data?.name ?? "Form"} / ${t("setting.seo.setting.title")} / ${t(
      `setting.seo.setting.${activeLinkIndex}` as NamespaceKeys<
        string,
        "setting"
      >,
    )}`;
  }, [activeLinkIndex, data?.name, t]);

  useEffect(() => {
    const link = getLinks(formId, data?.role).find(
      (link) => link.href === pathname,
    );

    if (!link?.isVisible) {
      router.push(`/a/form/${formId}/settings/general`);
    }
  }, [pathname, activeLinkIndex, formId, data?.role, router]);

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        {t("navigation.internal.settings")}
      </Text>
      <SettingsContainer>
        {isDesktop && <List top={activeLinkIndex * 100}>{renderLink}</List>}
        {!isDesktop && (
          <Tabs
            items={items}
            onSelect={(tab) => {
              router.push(`/a/form/${formId}/settings/${tab}`);
            }}
            sliderPosition={activeLinkIndex}
            backgroundColor="transparent"
          />
        )}
        {isLoadingForm || !data ? (
          <Loader hasDelay={false}>
            <Skeleton
              items={[
                { h: 24, w: "15%", mb: 10 },
                { h: 18, w: "40%", mb: 20 },
                { h: 100, w: "100%", mb: 20 },
                { h: 1, w: "100%", mb: 16 },
                { h: 36, w: 120, mb: 0, ml: "auto" },
              ]}
              padding={20}
            />
          </Loader>
        ) : (
          children
        )}
      </SettingsContainer>
    </Container>
  );
};

export default SettingsLayout;
