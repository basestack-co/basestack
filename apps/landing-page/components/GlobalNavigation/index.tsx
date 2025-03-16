"use client";

import React, { useState, useEffect } from "react";
// Router
import { useRouter } from "next/navigation";
// Utils
import { useMedia } from "react-use";
import { config as defaults, events } from "@basestack/utils";
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
  StyledLink,
} from "./styles";
import MobileMenu from "./MobileMenu";

interface NavigationProps {
  isSticky?: boolean;
}

const GlobalNavigation = ({ isSticky = true }: NavigationProps) => {
  const { isDarkMode, spacing, device } = useTheme();
  const router = useRouter();
  const [stargazers, setsStargazers] = useState(0);
  const t = useTranslations("navigation");
  const isMobile = useMedia(device.max.md, false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/repos/basestack-co/basestack")
      .then((res) => res.json())
      .then((data) => {
        setsStargazers(data.stargazers_count ?? 0);
      });
  }, []);

  const links = [
    {
      text: t("main.docs.title"),
      href: "https://docs.basestack.co/",
      isExternal: true,
    },
    {
      text: t("main.blog.title"),
      href: "https://blog.basestack.co/",
      isExternal: true,
    },
    {
      text: t("main.support.title"),
      href: "https://docs.basestack.co/help",
      isExternal: true,
    },
  ];

  const products = [
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
  ];

  const apps = [
    {
      title: t("main.product.flags.title"),
      onClick: () => router.push("/product/feature-flags"),
      icon: "flag",
      isExternal: true,
    },
    {
      title: t("main.product.forms.title"),
      onClick: () => router.push("/product/forms"),
      icon: "description",
      isExternal: true,
    },
  ];

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

            <StyledLink href="/">
              <Logo product="company" isOnDark={isDarkMode} size={36} />
            </StyledLink>
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
                        events.landing.navigation(link.text, link.href);
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
              <span>Star</span>
              {stargazers > 0 && <span>&nbsp;{stargazers}</span>}
            </Button>
            <Dropdown
              title="Create"
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
