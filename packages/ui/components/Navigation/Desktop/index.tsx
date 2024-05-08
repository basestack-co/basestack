import React from "react";
import { useTheme } from "styled-components";
// UI
import AvatarDropdown from "../../AvatarDropdown";
import ProjectsMenu from "../../ProjectsMenu";
import AppsDropdown from "../../AppsDropdown";
// Components
import { Logo, IconButton, Text } from "@basestack/design-system";
import { Container, List, ListItem, LogoContainer } from "./styles";
import ButtonLink from "../Components/ButtonLink";
// Types
import { DesktopNavigationUIProps } from "../types";

const DesktopNavigation = ({
  apps,
  avatar,
  projects,
  isMobile,
  onOpenDrawer,
  onClickLogo,
  rightLinks,
  leftLinks,
}: DesktopNavigationUIProps) => {
  const theme = useTheme();
  const currentForm = projects.current;
  const truncateProjectName = (str: string) => {
    return str.length <= 18 ? str : str.slice(0, 18) + "...";
  };

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        {isMobile && (
          <>
            <ListItem>
              <IconButton
                mr={theme.spacing.s3}
                icon="menu"
                size="medium"
                onClick={onOpenDrawer}
              />
            </ListItem>
            {!!currentForm && (
              <ListItem>
                <Text size="medium">{truncateProjectName(currentForm)}</Text>
              </ListItem>
            )}
          </>
        )}
        {!isMobile && (
          <>
            <ListItem>
              <LogoContainer onClick={onClickLogo}>
                <Logo size={36} product="forms" />
              </LogoContainer>
            </ListItem>
            <ProjectsMenu {...projects} />

            {leftLinks?.map((item, index) => (
              <ListItem key={`internal-link-${index}`}>
                <ButtonLink
                  isExternal={item.isExternal}
                  onClick={item.onClick}
                  isActive={item.isActive}
                >
                  {item.text}
                </ButtonLink>
              </ListItem>
            ))}
          </>
        )}
      </List>
      {!isMobile && (
        <List ml="auto" data-testid="navigation-right-ul">
          {rightLinks?.map((item, index) => (
            <ListItem key={`externalLinks-link-${index}`}>
              <ButtonLink
                isExternal={item.isExternal}
                href={item.href}
                isActive={item.isActive}
              >
                {item.text}
              </ButtonLink>
            </ListItem>
          ))}
          <ListItem>
            <AppsDropdown data={apps} />
          </ListItem>
          <ListItem ml={theme.spacing.s3}>
            <AvatarDropdown {...avatar} />
          </ListItem>
        </List>
      )}
    </Container>
  );
};

export default DesktopNavigation;
