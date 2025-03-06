"use client";

import React, { useEffect, useMemo } from "react";
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
// Locales
import { useTranslations, NamespaceKeys } from "next-intl";

const links = [
  {
    id: "1",
    i18nKey: "navigation.profile.general",
    tab: "general",
    href: "/a/user/tab/general",
  },
  {
    id: "2",
    i18nKey: "navigation.profile.billing",
    tab: "billing",
    href: "/a/user/tab/billing",
  },
];

const ProfileLayout = ({ children }: { children: React.ReactElement }) => {
  const t = useTranslations();
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const router = useRouter();
  const pathname = usePathname();

  const renderLink = useMemo(() => {
    return links.map(({ id, i18nKey, href }) => (
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
  }, [pathname, t]);

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

  useEffect(() => {
    document.title = `${t("profile.seo.setting.title")} / ${t(
      `profile.seo.setting.${activeLinkIndex}` as NamespaceKeys<
        string,
        "profile"
      >,
    )}`;
  }, [activeLinkIndex, t]);

  return (
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
              router.push(`/a/user/tab/${tab}`);
            }}
            sliderPosition={activeLinkIndex}
            backgroundColor="transparent"
          />
        )}
        {children}
      </SettingsContainer>
    </Container>
  );
};

export default ProfileLayout;
