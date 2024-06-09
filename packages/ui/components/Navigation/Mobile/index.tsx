import React from "react";
// Components
import AvatarDropdown from "../../AvatarDropdown";
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
  ButtonContainer,
  AppsLogo,
} from "./styles";
// Types
import { MobileNavigationUIProps } from "../types";

const AnimatedBackDropCover: any = animated(BackDropCover);
const AnimatedNavigation: any = animated(Container);

const MobileNavigation = ({
  onClose,
  isDrawerOpen,
  projects,
  avatar,
  onClickLogo,
  leftLinks,
  rightLinks,
  rightLinksTitle,
  product,
  apps,
  appsTitle,
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
                  <Logo size={36} product={product} />
                </LogoButton>
                <IconButton
                  icon="menu_open"
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
                          <ButtonContainer isActive={item.isActive}>
                            <Button
                              iconPlacement="left"
                              icon={item.icon}
                              variant={ButtonVariant.Neutral}
                              fullWidth
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.onClick) {
                                  item.onClick();
                                }
                              }}
                            >
                              {item.text}
                            </Button>
                          </ButtonContainer>
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
                    {projects.data.map((item) => (
                      <ListItem key={item.id}>
                        <ButtonContainer
                          isActive={
                            item.text.toLowerCase() ===
                            projects.current.toLowerCase()
                          }
                        >
                          <Button
                            iconPlacement="left"
                            icon="tag"
                            variant={ButtonVariant.Neutral}
                            onClick={(e) => {
                              e.stopPropagation();
                              item.onClick();
                            }}
                            fullWidth
                          >
                            {item.text}
                          </Button>
                        </ButtonContainer>
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
                  <HorizontalRule m={theme.spacing.s5} mb={0} />
                  <TitleContainer>
                    <Text muted fontWeight={500}>
                      {appsTitle}
                    </Text>
                  </TitleContainer>
                  <List>
                    {apps.map((item, index) => (
                      <ListItem key={index}>
                        <Button
                          variant={ButtonVariant.Neutral}
                          leftElement={
                            <AppsLogo>
                              <Logo size={24} product={item.product} />
                            </AppsLogo>
                          }
                          fullWidth
                        >
                          {item.title}
                        </Button>
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