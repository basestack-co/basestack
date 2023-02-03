import React, { useState } from "react";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@basestack/hooks";
// Components
import {
  Button,
  ButtonVariant,
  ButtonSize,
  IconButton,
} from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  LeftColumn,
  List,
  ListItem,
  Logo,
  RightColumn,
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

const Navigation = () => {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.device.min.md);

  return (
    <Container>
      <ContentContainer>
        <LeftColumn>
          {!isDesktop && (
            <IconButton
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
                      variant={ButtonVariant.Neutral}
                      onClick={() => console.log("yeah")}
                      size={ButtonSize.Medium}
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
            variant={ButtonVariant.Outlined}
            mr={theme.spacing.s3}
            onClick={() => console.log("yeah")}
            size={ButtonSize.Medium}
          >
            Sign In
          </Button>
          <Button onClick={() => console.log("yeah")} size={ButtonSize.Medium}>
            Get Started
          </Button>
        </RightColumn>
      </ContentContainer>
    </Container>
  );
};

export default Navigation;
