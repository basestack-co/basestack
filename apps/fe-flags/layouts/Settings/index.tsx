import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "styled-components";
import { Text } from "design-system";
import MainLayout from "../Main";
import { Button } from "design-system";
import {
  Container,
  List,
  SettingsContainer,
  ListItem,
  ButtonContainer,
} from "./styles";

const buttons = [
  {
    text: "General",
    href: "/settings/general",
  },
  {
    text: "Environments",
    href: "/settings/environments",
  },
  {
    text: "Members",
    href: "/settings/members",
  },
  {
    text: "Api Keys",
    href: "/settings/api-keys",
  },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const { pathname } = useRouter();

  const renderButton = useMemo(() => {
    return buttons.map((button, index) => (
      <ListItem key={index.toString()}>
        <ButtonContainer isActive={pathname === button.href}>
          <Link href={button.href} passHref>
            <Button as="a" variant="neutral" fontWeight={400} fullWidth>
              {button.text}
            </Button>
          </Link>
        </ButtonContainer>
      </ListItem>
    ));
  }, [pathname]);

  const activeButtonIndex = useMemo(
    () => buttons.findIndex((button) => button.href === pathname),
    [pathname]
  );

  return (
    <MainLayout>
      <Container>
        <Text size="xLarge" mb={theme.spacing.s5}>
          Settings
        </Text>
        <SettingsContainer>
          <List top={activeButtonIndex * 100}>{renderButton}</List>
          {children}
        </SettingsContainer>
      </Container>
    </MainLayout>
  );
};

export default SettingsLayout;
