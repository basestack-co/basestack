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
// Layouts
import MainLayout from "../Main";

const buttons = [
  {
    id: 1,
    text: "General",
    href: "/[projectSlug]/settings/general",
  },
  {
    id: 2,
    text: "Members",
    href: "/[projectSlug]/settings/members",
  },
  {
    id: 3,
    text: "Environments",
    href: "/[projectSlug]/settings/environments",
  },
];

const SettingsLayout = ({ children }: { children: React.ReactElement }) => {
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg);
  const router = useRouter();

  const projectSlug = router.query.projectSlug as string;

  const { data, isLoading: isLoadingProject } = trpc.project.bySlug.useQuery(
    { projectSlug },
    {
      enabled: !!projectSlug,
    },
  );

  const renderButton = useMemo(() => {
    return buttons.map(({ id, text, href }) => (
      <ListItem key={`settings-button-list-${id}`}>
        <StyledLink
          href={{
            pathname: href,
            query: { projectSlug },
          }}
          passHref
        >
          <StyledButton isActive={router.pathname === href}>
            {text}
          </StyledButton>
        </StyledLink>
      </ListItem>
    ));
  }, [router.pathname, projectSlug]);

  const activeButtonIndex = useMemo(
    () => buttons.findIndex((button) => button.href === router.pathname),
    [router.pathname],
  );

  const items = useMemo(
    () =>
      buttons.map(({ text }) => {
        return {
          id: text.toLowerCase(),
          text,
        };
      }),
    [],
  );

  return (
    <>
      <Head>
        <title>{data?.project.name ?? "Project"} / Settings</title>
      </Head>

      <MainLayout>
        <Container>
          <Text size="xLarge" mb={theme.spacing.s5}>
            Settings
          </Text>
          <SettingsContainer>
            {isDesktop && (
              <List top={activeButtonIndex * 100}>{renderButton}</List>
            )}
            {!isDesktop && (
              <Tabs
                items={items}
                onSelect={(item) => {
                  router.push({
                    pathname: `/[projectSlug]/settings/${item.toLowerCase()}`,
                    query: { projectSlug },
                  });
                }}
                sliderPosition={activeButtonIndex}
                backgroundColor="transparent"
              />
            )}
            {isLoadingProject || !data ? (
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
              React.cloneElement(children, {
                project: data.project,
              })
            )}
          </SettingsContainer>
        </Container>
      </MainLayout>
    </>
  );
};

export default SettingsLayout;
