"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSpring, animated } from "react-spring";
import { useStore } from "store";
// Router
import { useRouter, usePathname } from "next/navigation";
// Utils
import { useMedia } from "react-use";
import { config as defaults } from "@basestack/utils";
// Theme
import { useTheme } from "styled-components";
// Locales
import { useTranslations } from "next-intl";
// Components
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Logo,
  IconButton,
} from "@basestack/design-system";
import Dropdown from "./Dropdown";
import {
  Container,
  ContentContainer,
  IconButtonContainer,
  LeftColumn,
  List,
  ListItem,
  RightColumn,
  Span,
  StyledButton,
} from "./styles";
import MobileMenu from "./MobileMenu";

const { urls } = defaults;

interface NavigationProps {
  isSticky?: boolean;
}

const AnimatedSpan = animated(Span);

const GlobalNavigation = ({ isSticky = true }: NavigationProps) => {
  const { isDarkMode, spacing, device } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const isMobile = useMedia(device.max.md, false);

  const [stargazers, setsStargazers] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setStoreStargazers = useStore((state) => state.setStargazers);

  useEffect(() => {
    fetch("https://api.github.com/repos/basestack-co/basestack")
      .then((res) => res.json())
      .then((data) => {
        setsStargazers(data.stargazers_count ?? 0);
        setStoreStargazers(data.stargazers_count ?? 0);
      });
  }, [setStoreStargazers]);

  const links = useMemo(
    () => [
      {
        text: t("main.enterprise.title"),
        href: "/enterprise",
        isExternal: false,
      },
      {
        text: t("main.docs.title"),
        href: urls.docs.base,
        isExternal: true,
      },
      {
        text: t("main.support.title"),
        href: `${urls.docs.base}/help`,
        isExternal: true,
      },
      {
        text: t("main.blog.title"),
        href: urls.blog,
        isExternal: true,
      },
    ],
    [t]
  );

  const products = useMemo(
    () => [
      {
        title: t("main.product.flags.title"),
        description: t("main.product.flags.description"),
        onClick: () => router.push("/product/feature-flags"),
        icon: "flag",
      },
      {
        title: t("main.product.forms.title"),
        description: t("main.product.forms.description"),
        onClick: () => router.push("/product/forms"),
        icon: "description",
      },
    ],
    [router, t]
  );

  const apps = useMemo(
    () => [
      {
        title: t("main.product.flags.title"),
        onClick: () => window.open(urls.app.production.flags, "_blank"),

        icon: "flag",
        isExternal: true,
      },
      {
        title: t("main.product.forms.title"),
        onClick: () => window.open(urls.app.production.forms, "_blank"),
        icon: "description",
        isExternal: true,
      },
    ],
    [t]
  );

  const numberAnimation = useSpring({
    from: { x: 0 },
    to: { x: stargazers || 0 },
    config: { duration: 1000, tension: 200, friction: 20 },
  });

  return (
    <>
      <Container isSticky={isSticky}>
        <ContentContainer>
          <LeftColumn>
            <IconButtonContainer>
              <IconButton
                size="mediumLarge"
                icon={isMenuOpen ? "menu_open" : "menu"}
                onClick={() => setIsMenuOpen((prevState) => !prevState)}
              />
            </IconButtonContainer>
            <StyledButton
              onClick={() => {
                if (pathname !== "/") {
                  router.push("/");
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <Logo product="company" isOnDark={isDarkMode} size={36} />
            </StyledButton>
            <List>
              <ListItem>
                <Dropdown title={t("main.product.title")} data={products} />
              </ListItem>
              {links.map((link, index) => {
                return (
                  <ListItem key={index.toString()}>
                    <Button
                      variant={ButtonVariant.Neutral}
                      onClick={() => {
                        if (link.isExternal) {
                          window.open(link.href, "_blank");
                        } else {
                          router.push(link.href);
                        }
                      }}
                      size={ButtonSize.Normal}
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
              variant={ButtonVariant.Neutral}
              mr={spacing.s3}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(defaults.urls.repo, "_blank");
                }
              }}
              size={ButtonSize.Normal}
              iconPlacement="left"
              icon="github"
              minWidth="101px"
            >
              <span>{t("main.star.title")}</span>&nbsp;
              {stargazers > 0 && (
                <AnimatedSpan>
                  {numberAnimation.x.to((n) => n.toFixed(0))}
                </AnimatedSpan>
              )}
            </Button>
            <Dropdown
              title={t("main.launch.title")}
              data={apps}
              placement="right"
              buttonVariant={
                isDarkMode ? ButtonVariant.Tertiary : ButtonVariant.Secondary
              }
            />
          </RightColumn>
        </ContentContainer>
      </Container>

      {isMobile && (
        <MobileMenu
          products={{
            title: t("main.product.title"),
            data: products,
          }}
          links={{
            title: "Resources",
            data: links,
          }}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default GlobalNavigation;
