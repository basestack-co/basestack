import React from "react";
// Components
import { AvatarDropdown } from "@basestack/ui";
import {
  fadeIn,
  slideInLeft,
  IconButton,
  Text,
  Button,
  ButtonVariant,
  HorizontalRule,
  Logo,
} from "@basestack/design-system";
import { animated, config, useTransition } from "react-spring";
// Styles
import { useTheme } from "styled-components";
import {
  BackDropCover,
  Container,
  Footer,
  Header,
  List,
  ListItem,
  TitleContainer,
  ContentContainer,
  GlobalStyle,
  ScrollableContent,
  StyledLink,
  LogoButton,
} from "./styles";
// Types
import { MobileNavigationUIProps } from "../types";

const AnimatedBackDropCover = animated(BackDropCover);
const AnimatedNavigation = animated(Container);

const MobileNavigation = ({
  onClose,
  isDrawerOpen,
  projects,
  apps,
  avatar,
  onClickLogo,
  leftLinks,
  rightLinks,
  rightLinksTitle,
}: MobileNavigationUIProps) => {
  const theme = useTheme();

  const transitionNavigation = useTransition(isDrawerOpen, {
    config: { ...config.default, duration: 200 },
    ...slideInLeft,
  });

  const transitionBackdrop = useTransition(isDrawerOpen, {
    config: { ...config.default, duration: 150 },
    ...fadeIn,
  });

  return (
    <>
      {transitionNavigation(
        (styles, item) =>
          item && (
            <AnimatedNavigation style={styles}>
              <GlobalStyle />
              <Header>
                <LogoButton onClick={onClickLogo}>
                  <Logo size={40} />
                </LogoButton>
                <IconButton
                  icon="chevron_left"
                  onClick={onClose}
                  variant="neutral"
                />
              </Header>
              <ContentContainer>
                {leftLinks && leftLinks.length > 0 && (
                  <>
                    <List>
                      {leftLinks?.map((item, index) => (
                        <ListItem key={index}>
                          <Button
                            iconPlacement="left"
                            icon={item.icon}
                            variant={ButtonVariant.Neutral}
                            fullWidth
                            onClick={item.onClick}
                          >
                            {item.text}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                    <HorizontalRule m={theme.spacing.s5} mb={0} />
                  </>
                )}
                <ScrollableContent>
                  <TitleContainer>
                    <Text muted fontWeight={500}>
                      {projects.title}
                    </Text>
                  </TitleContainer>
                  <List>
                    {projects.data.map(({ id, text, onClick }) => (
                      <ListItem key={id}>
                        <Button
                          iconPlacement="left"
                          icon="tag"
                          variant={ButtonVariant.Neutral}
                          onClick={onClick}
                          fullWidth
                        >
                          {text}
                        </Button>
                      </ListItem>
                    ))}
                    <ListItem>
                      <Button
                        iconPlacement="left"
                        icon="add"
                        variant={ButtonVariant.Neutral}
                        fullWidth
                        onClick={() => {
                          onClose();
                          projects.onCreate();
                        }}
                      >
                        {projects.select.create}
                      </Button>
                    </ListItem>
                  </List>
                  <HorizontalRule m={theme.spacing.s5} mb={0} />
                  <TitleContainer>
                    <Text muted fontWeight={500}>
                      {rightLinksTitle}
                    </Text>
                  </TitleContainer>
                  <List>
                    {rightLinks?.map((item, index) => (
                      <ListItem key={index}>
                        <StyledLink
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            iconPlacement="left"
                            icon={item.icon}
                            variant={ButtonVariant.Neutral}
                            fullWidth
                          >
                            {item.text}
                          </Button>
                        </StyledLink>
                      </ListItem>
                    ))}
                  </List>
                </ScrollableContent>
              </ContentContainer>
              <HorizontalRule mx={theme.spacing.s5} my={0} />
              <Footer>
                <AvatarDropdown
                  {...avatar}
                  popupPlacement="top"
                  showFullButton
                />
              </Footer>
            </AnimatedNavigation>
          ),
      )}
      {transitionBackdrop(
        (styles, item) =>
          item && <AnimatedBackDropCover style={styles} onClick={onClose} />,
      )}
    </>
  );
};

export default MobileNavigation;
