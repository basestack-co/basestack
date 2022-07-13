import React, { memo } from "react";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@basestack/hooks";
import { Avatar, Button, ButtonVariant } from "../../atoms";
import { Container, List, ListItem, LogoContainer } from "./styles";
import { ButtonLink, MoreMenu, ProjectsMenu } from "./components";

export interface NavigationProps {
  /**
   * create flag callback
   */
  onCreateFlag: () => void;
  /**
   * pathname
   */
  pathname: string;
}

const Navigation = ({ onCreateFlag, pathname }: NavigationProps) => {
  const theme = useTheme();
  const isLargeDevice = useMediaQuery(theme.device.min.lg);

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        <ListItem>
          <LogoContainer>
            <Avatar round={false} alt="user image" userName="Logo" />
          </LogoContainer>
        </ListItem>
        <ProjectsMenu />
        {isLargeDevice && (
          <>
            <ListItem>
              <ButtonLink href="/flags" isActive={pathname === "/flags"}>
                Features
              </ButtonLink>
            </ListItem>
            <ListItem>
              <ButtonLink
                href="/settings/general"
                isActive={pathname ? pathname.includes("settings") : false}
              >
                Settings
              </ButtonLink>
            </ListItem>
            <ListItem ml={theme.spacing.s5}>
              <Button onClick={onCreateFlag} variant={ButtonVariant.Primary}>
                Create flag
              </Button>
            </ListItem>
          </>
        )}
      </List>
      <List ml="auto" data-testid="navigation-right-ul">
        {isLargeDevice && (
          <>
            <ListItem>
              <ButtonLink
                href="/documentation"
                isActive={pathname === "/documentation"}
              >
                Documentation
              </ButtonLink>
            </ListItem>
            <ListItem>
              <ButtonLink
                href="/resources"
                isActive={pathname === "/resources"}
              >
                Resources
              </ButtonLink>
            </ListItem>
            <ListItem>
              <Button as="a" variant={ButtonVariant.PrimaryNeutral}>
                Github
              </Button>
            </ListItem>
          </>
        )}
        {!isLargeDevice && <MoreMenu />}
        <ListItem ml={theme.spacing.s3}>
          <Avatar alt="user image" userName="Flávio Amaral" />
        </ListItem>
      </List>
    </Container>
  );
};

export default memo(Navigation);
