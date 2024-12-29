"use client";

import React, { useMemo } from "react";
// SEO
import Head from "next/head";
// Router
import { useParams, useRouter, usePathname } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Theme
import { useTheme } from "styled-components";
// Components
import { Loader, Skeleton, Tabs, Text } from "@basestack/design-system";
import {
  StyledLink,
  Container,
  List,
  ListItem,
  SettingsContainer,
  StyledButton,
} from "./styles";
// Hooks
import { useMedia } from "react-use";
// Locales
import { useTranslations, NamespaceKeys } from "next-intl";

const getLinks = (formId: string) => [
  {
    id: "1",
    i18nKey: "navigation.setting.general",
    tab: "general",
    href: `/hub/form/${formId}/settings/general`,
  },
  {
    id: "2",
    i18nKey: "navigation.setting.security",
    tab: "security",
    href: `/hub/form/${formId}/settings/security`,
  },
  {
    id: "3",
    i18nKey: "navigation.setting.customization",
    tab: "customization",
    href: `/hub/form/${formId}/settings/customization`,
  },
  {
    id: "4",
    i18nKey: "navigation.setting.notifications",
    tab: "notifications",
    href: `/hub/form/${formId}/settings/notifications`,
  },
];

const SettingsLayout = ({ children }: { children: React.ReactElement }) => {
  const t = useTranslations();
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const router = useRouter();
  const pathname = usePathname();
  const { formId } = useParams<{ formId: string }>();

  const { data, isLoading: isLoadingForm } = api.form.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  const renderLink = useMemo(() => {
    return getLinks(formId).map(({ id, i18nKey, href }) => (
      <ListItem key={`settings-button-list-${id}`}>
        <StyledLink href={href} passHref>
          <StyledButton isActive={pathname === href}>
            {t(i18nKey as NamespaceKeys<string, "navigation">)}
          </StyledButton>
        </StyledLink>
      </ListItem>
    ));
  }, [pathname, formId, t]);

  const activeLinkIndex = useMemo(
    () => getLinks(formId).findIndex((button) => button.href === pathname),
    [pathname, formId],
  );

  const items = useMemo(
    () =>
      getLinks(formId).map(({ i18nKey, tab }) => {
        return {
          id: tab.toLowerCase(),
          text: t(i18nKey as NamespaceKeys<string, "navigation">),
        };
      }),
    [t, formId],
  );

  return (
    <>
      <Head>
        <title>
          {data?.name ?? "Form"} / {t("setting.seo.setting.title")} /{" "}
          {t(
            `setting.seo.setting.${activeLinkIndex}` as NamespaceKeys<
              string,
              "setting"
            >,
          )}
        </title>
      </Head>
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
                router.push(`/hub/form/${formId}/settings/${tab}`);
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
    </>
  );
};

export default SettingsLayout;
