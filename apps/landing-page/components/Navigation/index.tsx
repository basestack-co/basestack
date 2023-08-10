import React, { useState } from "react";
// Router
import { useRouter } from "next/router";
// Utils
import { config as defaults, events } from "@basestack/utils";
// Theme
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
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Logo,
  IconButton,
} from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  LeftColumn,
  List,
  ListItem,
  PopupContainer,
  PopupWrapper,
  PopupItem,
  RightColumn,
  GlobalStyle,
  BurgerMenu,
} from "./styles";

const links = [
  {
    text: "Platform",
    href: "#platform",
  },
  {
    text: "Discover Features",
    href: "#features",
  },
  {
    text: "Integration",
    href: "#code",
  },
  {
    text: "Why Feature Flags?",
    href: "#why",
  },
  {
    text: "FAQs",
    href: "#questions",
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
  const router = useRouter();

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
            {/* Mobile Burger */}
            <BurgerMenu isDarkMode={isDarkMode}>
              <IconButton
                size="large"
                icon={isMenuOpen ? "menu_open" : "menu"}
                onClick={() => setIsMenuOpen((prevState) => !prevState)}
                mr={theme.spacing.s3}
              />
            </BurgerMenu>
            <Logo />
            {/* Desktop List */}
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
                      onClick={() => {
                        events.landing.navigation(link.text, link.href);
                        router.push(link.href);
                      }}
                      size={ButtonSize.Medium}
                      backgroundColor="transparent"
                    >
                      {link.text}
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </LeftColumn>
          <RightColumn>
            <Button
              variant={
                isDarkMode ? ButtonVariant.Secondary : ButtonVariant.Tertiary
              }
              mr={theme.spacing.s3}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(defaults.urls.repo, "_blank");
                }
              }}
              size={ButtonSize.Medium}
              backgroundColor="transparent"
            >
              Github
            </Button>
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(defaults.urls.docs.base, "_blank");
                }
              }}
              size={ButtonSize.Medium}
              variant={ButtonVariant.Secondary}
            >
              Documentation
            </Button>
          </RightColumn>
        </ContentContainer>
      </Container>
      {/* Mobile Menu */}
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
                    onClick={() => {
                      setIsMenuOpen(false);
                      events.landing.navigation(item.text, item.href);
                      router.push(item.href);
                    }}
                    size={ButtonSize.Medium}
                    backgroundColor="transparent"
                    fullWidth
                  >
                    {item.text}
                  </Button>
                </AnimatedPopupItem>
              ),
          )}
        </AnimatedPopup>
      </PopupContainer>
    </>
  );
};

export default Navigation;
