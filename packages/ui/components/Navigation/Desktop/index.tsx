// Components
import { Avatar, IconButton, Logo, Text } from "@basestack/design-system";
import React from "react";
import { useTheme } from "styled-components";
import AppsDropdown from "../../AppsDropdown";
// UI
import AvatarDropdown from "../../AvatarDropdown";
import ProjectsMenu from "../../ProjectsMenu";
import ButtonLink from "../Components/ButtonLink";
// Types
import { DesktopNavigationUIProps } from "../types";
import { Container, List, ListItem, LogoContainer } from "./styles";

const DesktopNavigation = ({
  apps,
  avatar,
  projects,
  isMobile,
  onOpenDrawer,
  onClickLogo,
  rightLinks,
  leftLinks,
  product,
}: DesktopNavigationUIProps) => {
  const theme = useTheme();
  const currentProject = projects.current;
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
            {!!currentProject && (
              <ListItem display="flex" alignItems="center">
                <Avatar
                  size="xSmall"
                  round={false}
                  userName={currentProject}
                  alt={`project-${currentProject}`}
                  mr={theme.spacing.s2}
                />
                <Text size="medium">{truncateProjectName(currentProject)}</Text>
              </ListItem>
            )}
          </>
        )}
        {!isMobile && (
          <>
            <ListItem>
              <LogoContainer onClick={onClickLogo}>
                <Logo size={36} product={product} />
              </LogoContainer>
            </ListItem>
            <ProjectsMenu {...projects} />
            {leftLinks?.map((item, index) => (
              <ListItem key={`internal-link-${index}`}>
                <ButtonLink
                  type={item.type}
                  onClick={item.onClick}
                  isActive={item.isActive}
                  variant={item.buttonVariant}
                  space={item.space}
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
                type={item.type}
                href={item.href}
                isActive={item.isActive}
                variant={item.buttonVariant}
                space={item.space}
              >
                {item.text}
              </ButtonLink>
            </ListItem>
          ))}
          {!!apps?.length && (
            <ListItem>
              <AppsDropdown data={apps} />
            </ListItem>
          )}
          <ListItem ml={theme.spacing.s3}>
            <AvatarDropdown {...avatar} />
          </ListItem>
        </List>
      )}
    </Container>
  );
};

export default DesktopNavigation;
