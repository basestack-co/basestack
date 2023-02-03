import React from "react";
import { useTheme } from "styled-components";
// Components
import { Text, Button, ButtonSize } from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  Input,
  InputContainer,
  LeftColumn,
  LeftColumnContent,
  List,
  ListItem,
  RightColumn,
  CopyWrightContainer,
} from "./styles";

const links = [
  {
    text: "Privacy policy",
  },
  {
    text: "Cookies policy",
  },
  {
    text: "Term of use",
  },
];

const Footer = () => {
  const theme = useTheme();

  return (
    <Container>
      <ContentContainer>
        <LeftColumn>
          <Text
            size="xLarge"
            color={theme.colors.gray300}
            mb={theme.spacing.s2}
          >
            MoonFlags
          </Text>
          <LeftColumnContent>
            <CopyWrightContainer>
              <Text size="medium" fontWeight={400} color={theme.colors.gray300}>
                © MoonFlags 2023
              </Text>
            </CopyWrightContainer>
            <List>
              {links.map((link, index) => {
                return (
                  <ListItem key={index.toString()}>
                    <Text
                      size="medium"
                      fontWeight={400}
                      color={theme.colors.gray300}
                    >
                      {link.text}
                    </Text>
                  </ListItem>
                );
              })}
            </List>
          </LeftColumnContent>
        </LeftColumn>
        <RightColumn>
          <Text
            size="medium"
            fontWeight={400}
            color={theme.colors.gray300}
            mb={theme.spacing.s2}
          >
            Updates right to your inbox
          </Text>
          <InputContainer>
            <Input placeholder="Enter your email" />
            <Button
              onClick={() => console.log("yeah")}
              size={ButtonSize.Medium}
            >
              Send
            </Button>
          </InputContainer>
        </RightColumn>
      </ContentContainer>
    </Container>
  );
};

export default Footer;
