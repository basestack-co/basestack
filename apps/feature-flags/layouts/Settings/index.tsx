import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "styled-components";
import { Button, ButtonVariant, Tabs, Text } from "@basestack/design-system";
import MainLayout from "../Main";
import {
  ButtonContainer,
  Container,
  List,
  ListItem,
  SettingsContainer,
} from "./styles";
import { useMediaQuery } from "@basestack/hooks";

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

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const { pathname, push, query } = useRouter();

  const projectSlug = query.projectSlug as string;

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
          {children}
        </SettingsContainer>
      </Container>
    </MainLayout>
  );
};

export default SettingsLayout;
