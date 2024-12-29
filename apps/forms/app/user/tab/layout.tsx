"use client";

import React, { useMemo } from "react";
// SEO
import Head from "next/head";
// Router
import { useRouter, usePathname } from "next/navigation";
// Theme
import { useTheme } from "styled-components";
// Components
import { Tabs, Text } from "@basestack/design-system";
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
// Utils
import { getCookieValueAsBoolean, config } from "@basestack/utils";
// Locales
import { useTranslations, NamespaceKeys } from "next-intl";

const links = [
  {
    id: "1",
    i18nKey: "navigation.profile.general",
    tab: "general",
    href: "/user/tab/general",
  },
  {
    id: "2",
    i18nKey: "navigation.profile.billing",
    tab: "billing",
    href: "/user/tab/billing",
  },
];

const ProfileLayout = ({ children }: { children: React.ReactElement }) => {
  const t = useTranslations();
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const router = useRouter();
  const pathname = usePathname();

  const useBilling = useMemo(
    () => getCookieValueAsBoolean(config.cookies.useBilling) || config.isDev,
    [],
  );

  const renderLink = useMemo(() => {
    return links
      .filter((link) => link.id === "1" || useBilling)
      .map(({ id, i18nKey, href }) => (
        <ListItem key={`profile-settings-button-list-${id}`}>
          <StyledLink
            href={{
              pathname: href,
            }}
            passHref
          >
            <StyledButton isActive={pathname === href}>
              {t(i18nKey as NamespaceKeys<string, "navigation">)}
            </StyledButton>
          </StyledLink>
        </ListItem>
      ));
  }, [pathname, t, useBilling]);

  const activeLinkIndex = useMemo(
    () => links.findIndex((button) => button.href === pathname),
    [pathname],
  );

  const items = useMemo(
    () =>
      links.map(({ i18nKey, tab }) => {
        return {
          id: tab.toLowerCase(),
          text: t(i18nKey as NamespaceKeys<string, "navigation">),
        };
      }),
    [t],
  );

  return (
    <>
      <Head>
        <title>
          {t("profile.seo.setting.title")} /{" "}
          {t(
            `profile.seo.setting.${activeLinkIndex}` as NamespaceKeys<
              string,
              "profile"
            >,
          )}
        </title>
      </Head>
      <Container>
        <Text size="xLarge" mb={theme.spacing.s5}>
          {t("navigation.internal.profile")}
        </Text>
        <SettingsContainer>
          {isDesktop && <List top={activeLinkIndex * 100}>{renderLink}</List>}
          {!isDesktop && (
            <Tabs
              items={items}
              onSelect={(tab) => {
                router.push(`/user/tab/${tab}`);
              }}
              sliderPosition={activeLinkIndex}
              backgroundColor="transparent"
            />
          )}
          {children}
        </SettingsContainer>
      </Container>
    </>
  );
};

export default ProfileLayout;
