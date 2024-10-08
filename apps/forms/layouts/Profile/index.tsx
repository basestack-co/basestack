import React, { useMemo } from "react";
// SEO
import Head from "next/head";
// Router
import { useRouter } from "next/router";
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
} from "../styles";
// Hooks
import { useMedia } from "react-use";
// Utils
import { getCookieValueAsBoolean, config } from "@basestack/utils";
// Locales
import useTranslation from "next-translate/useTranslation";
// Layouts
import MainLayout from "../Main";

const links = [
  {
    id: "1",
    i18nKey: "profile.general",
    tab: "general",
    href: "/user/profile/general",
  },
  {
    id: "2",
    i18nKey: "profile.billing",
    tab: "billing",
    href: "/user/profile/billing",
  },
];

const ProfileLayout = ({ children }: { children: React.ReactElement }) => {
  const { t } = useTranslation("navigation");
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const router = useRouter();

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
            <StyledButton isActive={router.pathname === href}>
              {t(i18nKey)}
            </StyledButton>
          </StyledLink>
        </ListItem>
      ));
  }, [router.pathname, t, useBilling]);

  const activeLinkIndex = useMemo(
    () => links.findIndex((button) => button.href === router.pathname),
    [router.pathname],
  );

  const items = useMemo(
    () =>
      links.map(({ i18nKey, tab }) => {
        return {
          id: tab.toLowerCase(),
          text: t(i18nKey),
        };
      }),
    [t],
  );

  return (
    <>
      <Head>
        <title>
          {t("profile:seo.setting.title")} /{" "}
          {t(`profile:seo.setting.${activeLinkIndex}`)}
        </title>
      </Head>
      <MainLayout>
        <Container>
          <Text size="xLarge" mb={theme.spacing.s5}>
            {t("internal.profile")}
          </Text>
          <SettingsContainer>
            {isDesktop && <List top={activeLinkIndex * 100}>{renderLink}</List>}
            {!isDesktop && (
              <Tabs
                items={items}
                onSelect={async (tab) => {
                  await router.push({
                    pathname: `/user/profile/${tab}`,
                  });
                }}
                sliderPosition={activeLinkIndex}
                backgroundColor="transparent"
              />
            )}
            {children}
          </SettingsContainer>
        </Container>
      </MainLayout>
    </>
  );
};

export default ProfileLayout;
