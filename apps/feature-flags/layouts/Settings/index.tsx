import React, { useMemo } from "react";
// SEO
import Head from "next/head";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
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
import useTranslation from "next-translate/useTranslation";
// Layouts
import MainLayout from "../Main";

const links = [
  {
    id: "1",
    i18nKey: "setting.general",
    tab: "general",
    href: "/project/[projectId]/settings/general",
  },
  {
    id: "2",
    i18nKey: "setting.members",
    tab: "members",
    href: "/project/[projectId]/settings/members",
  },
  {
    id: "3",
    i18nKey: "setting.environments",
    tab: "environments",
    href: "/project/[projectId]/settings/environments",
  },
];

const SettingsLayout = ({ children }: { children: React.ReactElement }) => {
  const { t } = useTranslation("navigation");
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const { data: project, isLoading: isLoadingProject } =
    trpc.project.byId.useQuery(
      { projectId },
      {
        enabled: !!projectId,
      },
    );

  const renderLink = useMemo(() => {
    return links.map(({ id, i18nKey, href }) => (
      <ListItem key={`settings-button-list-${id}`}>
        <StyledLink
          href={{
            pathname: href,
            query: { projectId },
          }}
          passHref
        >
          <StyledButton isActive={router.pathname === href}>
            {t(i18nKey)}
          </StyledButton>
        </StyledLink>
      </ListItem>
    ));
  }, [router.pathname, projectId, t]);

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
        <title>{project?.name ?? "Project"} / Settings</title>
      </Head>

      <MainLayout>
        <Container>
          <Text size="xLarge" mb={theme.spacing.s5}>
            Settings
          </Text>
          <SettingsContainer>
            {isDesktop && <List top={activeLinkIndex * 100}>{renderLink}</List>}
            {!isDesktop && (
              <Tabs
                items={items}
                onSelect={(tab) => {
                  router.push({
                    pathname: `/project/[projectId]/settings/${tab}`,
                    query: { projectId },
                  });
                }}
                sliderPosition={activeLinkIndex}
                backgroundColor="transparent"
              />
            )}
            {isLoadingProject || !project ? (
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
      </MainLayout>
    </>
  );
};

export default SettingsLayout;
