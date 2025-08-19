// Components
import { Avatar, Box, IconButton, Logo, Text } from "@basestack/design-system";
import { useTheme } from "styled-components";
import AppsDropdown from "../../AppsDropdown";
// UI
import AvatarDropdown from "../../AvatarDropdown";
import ProjectsMenu from "../../ProjectsMenu";
import ButtonLink from "../Components/ButtonLink";
// Types
import type { DesktopNavigationUIProps } from "../types";
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
  isDrawerOpen,
}: DesktopNavigationUIProps) => {
  const theme = useTheme();
  const currentProject = projects.current;
  const truncateProjectName = (str: string) => {
    return str.length <= 18 ? str : `${str.slice(0, 18)}...`;
  };

  return (
    <Container>
      {isMobile && (
        <>
          <LogoContainer showSeparator={!!currentProject} onClick={onClickLogo}>
            <Logo size={32} product={product} isOnDark={theme.isDarkMode} />
          </LogoContainer>
          {!!currentProject && (
            <Box display="flex" alignItems="center" px={theme.spacing.s3}>
              <Avatar
                size="xSmall"
                round={false}
                userName={currentProject}
                alt={`project-${currentProject}`}
                mr={theme.spacing.s2}
              />
              <Text size="small" fontWeight={500}>
                {truncateProjectName(currentProject)}
              </Text>
            </Box>
          )}
          {!isDrawerOpen && (
            <Box ml="auto">
              <IconButton icon="menu" size="medium" onClick={onOpenDrawer} />
            </Box>
          )}
        </>
      )}
      {!isMobile && (
        <List>
          <ListItem>
            <LogoContainer showSeparator onClick={onClickLogo}>
              <Logo size={36} product={product} isOnDark={theme.isDarkMode} />
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
        </List>
      )}
      {!isMobile && (
        <List ml="auto">
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
