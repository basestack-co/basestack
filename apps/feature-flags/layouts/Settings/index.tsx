import React, {  useMemo } from "react";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
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
import { useMediaQuery } from "@basestack/hooks";
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
  {
    id: 4,
    text: "Endpoints & API Keys",
    href: "/[projectSlug]/settings/api-keys",
  },
];

const SettingsLayout = ({ children }: { children: React.ReactElement }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const router = useRouter();

  const projectSlug = router.query.projectSlug as string;

  const { data, isLoading: isLoadingProject } = trpc.project.bySlug.useQuery(
    { projectSlug },
    {
      enabled: !!projectSlug,
    }
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
    [router.pathname]
  );

  const items = useMemo(
    () =>
      buttons.map(({ text }) => {
        return {
          id: text.toLowerCase(),
          text,
        };
      }),
    []
  );

  return (
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
              onSelect={(item) =>
                router.push(item.replace(/\s+/g, "-").toLowerCase())
              }
              sliderPosition={activeButtonIndex}
              backgroundColor="transparent"
            />
          )}
          {React.cloneElement(children, {
            project: !isLoadingProject && data ? data.project : null,
          })}
        </SettingsContainer>
      </Container>
    </MainLayout>
  );
};

export default SettingsLayout;
