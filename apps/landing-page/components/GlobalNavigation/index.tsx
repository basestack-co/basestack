import React, { useState, useEffect } from "react";
// Router
import { useRouter } from "next/navigation";
// Utils
import { config as defaults, events } from "@basestack/utils";
// Theme
import { useTheme } from "styled-components";
// Components
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Logo,
} from "@basestack/design-system";
import Dropdown from "./Dropdown";
import {
  Container,
  ContentContainer,
  LeftColumn,
  List,
  ListItem,
  RightColumn,
  StyledLink,
} from "./styles";

const links = [
  {
    text: "Enterprise",
    href: "#enterprise",
  },
  {
    text: "About Us",
    href: "#features",
  },
  {
    text: "Docs",
    href: "#code",
  },
  {
    text: "Blog",
    href: "#why",
  },
];

interface NavigationProps {
  isSticky?: boolean;
}

const GlobalNavigation = ({ isSticky = true }: NavigationProps) => {
  const { isDarkMode, spacing } = useTheme();
  const router = useRouter();
  const [stargazers, setsStargazers] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/basestack-co/basestack")
      .then((res) => res.json())
      .then((data) => {
        setsStargazers(data.stargazers_count ?? 0);
      });
  }, []);

  return (
    <Container isSticky={isSticky}>
      <ContentContainer>
        <LeftColumn>
          <StyledLink href="/">
            <Logo product="company" isOnDark={isDarkMode} size={36} />
          </StyledLink>
          <List>
            <ListItem>
              <Dropdown
                title="Products"
                data={[
                  {
                    title: "Feature Flags",
                    description: "On and Off features",
                    onClick: () => router.push("/flags"),
                    icon: "flag",
                  },
                  {
                    title: "Forms",
                    description: "Send fast and easy",
                    onClick: () => router.push("/forms"),
                    icon: "description",
                  },
                ]}
              />
            </ListItem>

            {links.map((link, index) => {
              return (
                <ListItem key={index.toString()}>
                  <Button
                    variant={ButtonVariant.Tertiary}
                    onClick={() => {
                      events.landing.navigation(link.text, link.href);
                      router.push(link.href);
                    }}
                    size={ButtonSize.Normal}
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
            variant={ButtonVariant.Tertiary}
            mr={spacing.s4}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(defaults.urls.repo, "_blank");
              }
            }}
            size={ButtonSize.Normal}
            backgroundColor="transparent"
            iconPlacement="left"
            icon="github"
          >
            <span>Star</span>
            {stargazers > 0 && <span>&nbsp;{stargazers}</span>}
          </Button>
          <Button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(defaults.urls.docs.base, "_blank");
              }
            }}
            size={ButtonSize.Normal}
            variant={
              isDarkMode ? ButtonVariant.Tertiary : ButtonVariant.Secondary
            }
          >
            Docs
          </Button>
        </RightColumn>
      </ContentContainer>
    </Container>
  );
};

export default GlobalNavigation;
