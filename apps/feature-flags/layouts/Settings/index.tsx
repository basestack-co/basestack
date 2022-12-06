import React, { useMemo } from "react";
// Router
import { useRouter } from "next/router";
import Link from "next/link";
// Server
import { trpc } from "libs/trpc";
// Theme
import { useTheme } from "styled-components";
// Components
import { Button, ButtonVariant, Tabs, Text } from "@basestack/design-system";
import {
  ButtonContainer,
  Container,
  List,
  ListItem,
  SettingsContainer,
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
    text: "Environments",
    href: "/[projectSlug]/settings/environments",
  },
  {
    id: 3,
    text: "Members",
    href: "/[projectSlug]/settings/members",
  },
  {
    id: 4,
    text: "Api Keys",
    href: "/[projectSlug]/settings/api-keys",
  },
];

const SettingsLayout = ({ children }: { children: React.ReactElement }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const { pathname, push, query } = useRouter();

  const projectSlug = query.projectSlug as string;

  const { data, isLoading: isLoadingProject } = trpc.project.bySlug.useQuery(
    { projectSlug },
    {
      enabled: !!projectSlug,
    }
  );

  const renderButton = useMemo(() => {
    return buttons.map(({ id, text, href }) => (
      <ListItem key={`settings-button-list-${id}`}>
        <ButtonContainer isActive={pathname === href}>
          <Link
            href={{
              pathname: href,
              query: { projectSlug },
            }}
            style={{ textDecoration: "none" }}
            passHref
          >
            <Button variant={ButtonVariant.Neutral} fontWeight={400} fullWidth>
              {text}
            </Button>
          </Link>
        </ButtonContainer>
      </ListItem>
    ));
  }, [pathname, projectSlug]);

  const activeButtonIndex = useMemo(
    () => buttons.findIndex((button) => button.href === pathname),
    [pathname]
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
              onSelect={(item) => push(item.replace(/\s+/g, "-").toLowerCase())}
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
