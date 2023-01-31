import React from "react";
import { useTheme } from "styled-components";
// Components
import { Text } from "@basestack/design-system";
import Illustration, { IllustrationVariant } from "../Illustration";
import {
  Card,
  CardsContainer,
  Container,
  ContentContainer,
  ImageContainer,
} from "./styles";
import SectionHeader from "../SectionHeader";

const Cards = () => {
  const theme = useTheme();

  return (
    <Container>
      <ContentContainer>
        <SectionHeader
          title="Feature flags"
          text="MoonFlags provides an all-in-one platform for developing, implementing, and managing your feature flags."
        />
        <CardsContainer>
          <Card>
            <ImageContainer>
              <Illustration
                width="100%"
                variant={IllustrationVariant.Browser}
              />
            </ImageContainer>
            <Text size="xLarge" mb={theme.spacing.s2} mt={theme.spacing.s5}>
              Manage Flags
            </Text>
            <Text muted>
              MoonFlags makes it easy to create and manage feature toggles
              across web, mobile, and server-side applications. Just wrap a
              section of code with a flag, and then use MoonFlags to manage that
              feature.
            </Text>
          </Card>

          <Card>
            <ImageContainer>
              <Illustration
                width="100%"
                variant={IllustrationVariant.Browser}
              />
            </ImageContainer>
            <Text size="xLarge" mb={theme.spacing.s2} mt={theme.spacing.s5}>
              Powerful Segmenting rules
            </Text>
            <Text muted>
              Manage feature flags by development environment, and for
              individual users, a segment of users, or a percentage. This means
              quickly implementing practices like canary deployments.
            </Text>
          </Card>

          <Card>
            <ImageContainer>
              <Illustration
                width="100%"
                variant={IllustrationVariant.Browser}
              />
            </ImageContainer>
            <Text size="xLarge" mb={theme.spacing.s2} mt={theme.spacing.s5}>
              Drive A/B and Multivariate Tests
            </Text>
            <Text muted>
              Multivariate flags allow you to use a percentage split across two
              or more variations for precise A/B/n testing and experimentation.
            </Text>
          </Card>
        </CardsContainer>
      </ContentContainer>
    </Container>
  );
};

export default Cards;
