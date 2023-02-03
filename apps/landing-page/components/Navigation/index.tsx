import React from "react";
import { useTheme } from "styled-components";
import { Button, ButtonVariant, ButtonSize } from "@basestack/design-system";
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

  return (
    <Container>
      <ContentContainer>
        <LeftColumn>
          <Logo />
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
