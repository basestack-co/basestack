import React from "react";
// Types
import { MobileNavigationProps } from "../types";
// Components
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
} from "./styles";

const AnimatedBackDropCover = animated(BackDropCover);
const AnimatedNavigation = animated(Container);

const NavigationDrawer = ({
  isDrawerOpen,
  onClose,
  data,
  internalLinks,
  externalLinks,
  projectId,
  rightSideComponent,
  onLogoClick,
}: MobileNavigationProps) => {
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
                <span onClick={onLogoClick}>
                  <Logo size={40} />
                </span>
                <IconButton
                  icon="chevron_left"
                  onClick={onClose}
                  variant="neutral"
                />
              </Header>
              <ContentContainer>
                {!!projectId && (
                  <>
                    <List>
                      {internalLinks.map((item, index) => (
                        <ListItem key={index}>
                          <Button
                            iconPlacement="left"
                            icon={item.icon}
                            variant={ButtonVariant.Neutral}
                            fullWidth
                            onClick={() => {
                              item.onClick(item.to, projectId);
                            }}
                          >
                            {item.text}
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
                          }}
                        >
                          {t("create.form")}
                        </Button>
                      </ListItem>
                    </List>
                    <HorizontalRule m={theme.spacing.s5} mb={0} />
                  </>
                )}
                <ScrollableContent>
                  <TitleContainer>
                    <Text muted fontWeight={500}>
                      {t("forms.title")}
                    </Text>
                  </TitleContainer>
                  <List>
                    {data?.map(({ id, text, onClick }) => (
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
                        }}
                      >
                        {t("create.form")}
                      </Button>
                    </ListItem>
                  </List>
                  <HorizontalRule m={theme.spacing.s5} />
                  <TitleContainer>
                    <Text muted fontWeight={500}>
                      {t("external.docs")}
                    </Text>
                  </TitleContainer>
                  <List>
                    {externalLinks.map((item, index) => (
                      <ListItem key={index}>
                        <StyledLink
                          href={item.to}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            as="div"
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
              <Footer>{rightSideComponent}</Footer>
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

export default NavigationDrawer;
