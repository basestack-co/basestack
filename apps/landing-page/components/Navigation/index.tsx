import React, { useState } from "react";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@basestack/hooks";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "react-spring";
// Components
import { Button, ButtonVariant, ButtonSize } from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  LeftColumn,
  List,
  ListItem,
  Logo,
  PopupContainer,
  PopupWrapper,
  PopupItem,
  RightColumn,
  GlobalStyle,
  BurgerMenu,
} from "./styles";

const links = [
  {
    text: "Product",
  },
  {
    text: "Solutions",
  },
  {
    text: "Resources",
  },
  {
    text: "Pricing",
  },
];

interface NavigationProps {
  isDarkMode: boolean;
  hasBackdropFilter?: boolean;
}

const AnimatedPopup = animated(PopupWrapper);
const AnimatedPopupItem = animated(PopupItem);

const Navigation = ({
  isDarkMode,
  hasBackdropFilter = true,
}: NavigationProps) => {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.device.max.md);
  const isDesktop = useMediaQuery(theme.device.min.md);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: "0", opacity: 0 },
    to: {
      size: isMenuOpen ? "100%" : "0",
      opacity: isMenuOpen ? 1 : 0,
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(isMenuOpen ? links : [], {
    ref: transApi,
    trail: 400 / links.length,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useChain(isMenuOpen ? [springApi, transApi] : [transApi, springApi], [
    0,
    isMenuOpen ? 0.3 : 0.6,
  ]);

  return (
    <>
      <GlobalStyle isMenuOpen={isMenuOpen} />
      <Container isDarkMode={isDarkMode} hasBackdropFilter={hasBackdropFilter}>
        <ContentContainer>
          <LeftColumn>
            {isMobile && (
              <BurgerMenu
                isDarkMode={isDarkMode}
                size="large"
                icon={isMenuOpen ? "menu_open" : "menu"}
                onClick={() => setIsMenuOpen((prevState) => !prevState)}
                mr={theme.spacing.s3}
              />
            )}
            <Logo />
            {isDesktop && (
              <List>
                {links.map((link, index) => {
                  return (
                    <ListItem key={index.toString()}>
                      <Button
                        variant={
                          isDarkMode
                            ? ButtonVariant.Secondary
                            : ButtonVariant.Tertiary
                        }
                        onClick={() => console.log("yeah")}
                        size={ButtonSize.Medium}
                        backgroundColor="transparent"
                      >
                        {link.text}
                      </Button>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </LeftColumn>
          <RightColumn>
            <Button
              variant={
                isDarkMode ? ButtonVariant.Secondary : ButtonVariant.Tertiary
              }
              mr={theme.spacing.s3}
              onClick={() => console.log("yeah")}
              size={ButtonSize.Medium}
              backgroundColor="transparent"
            >
              Sign In
            </Button>
            <Button
              onClick={() => console.log("yeah")}
              size={ButtonSize.Medium}
            >
              Get Started
            </Button>
          </RightColumn>
        </ContentContainer>
      </Container>
      {isMobile && (
        <PopupContainer isMenuOpen={isMenuOpen}>
          <AnimatedPopup
            style={{ ...rest, width: size, height: size }}
            isDarkMode={isDarkMode}
          >
            {transition(
              (style, item) =>
                item && (
                  <AnimatedPopupItem style={style}>
                    <Button
                      variant={
                        isDarkMode
                          ? ButtonVariant.Secondary
                          : ButtonVariant.Tertiary
                      }
                      onClick={() => setIsMenuOpen((prevState) => !prevState)}
                      size={ButtonSize.Medium}
                      backgroundColor="transparent"
                      fullWidth
                    >
                      {item.text}
                    </Button>
                  </AnimatedPopupItem>
                )
            )}
          </AnimatedPopup>
        </PopupContainer>
      )}
    </>
  );
};

export default Navigation;
