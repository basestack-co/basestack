import React from "react";
import { useMedia } from "react-use";
import { rem } from "polished";
// Theme
import { useTheme } from "styled-components";
// Utils
import { config, events } from "@basestack/utils";
// Components
import { Button, ButtonSize, Text } from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  InfoContainer,
  Image,
  Cards,
  ImageContainer,
} from "./styles";
import SectionHeader from "../SectionHeader";
import { Card } from "../styles";

interface HeroProps {
  title: string;
  text: string;
  image?: { src: string; alt: string };
}

const AppsHero = ({ title, text, image = { alt: "", src: "" } }: HeroProps) => {
  const { isDarkMode, device, spacing } = useTheme();
  const isMobile = useMedia(device.max.sm, false);

  return (
    <Container>
      <ContentContainer>
        <InfoContainer>
          <SectionHeader
            title={title}
            text={text}
            hasMarginBottom={false}
            maxWidth="100%"
          />
          <Button
            mt={spacing.s5}
            onClick={() => {
              events.landing.deploy("Deploy to Vercel");
              if (typeof window !== "undefined") {
                window.open(
                  `${config.urls.docs.base}/self-hosting/providers/deploy-vercel`,
                  "_blank",
                );
              }
            }}
            size={ButtonSize.Medium}
          >
            Deploy to Vercel
          </Button>
        </InfoContainer>
        <Cards>
          <Card p={`${rem("20px")} ${rem("20px")} 0 ${rem("20px")}`}>
            <Text size="large" mb={spacing.s2}>
              Feature Flags
            </Text>
            <Text size="medium" fontWeight={400} muted maxWidth="32ch">
              Lorem ipsum dolor sit amet, ipsum dolor sit amet dolor set amet.
            </Text>
            <ImageContainer>
              <Image src={image?.src} alt={image?.alt} />
            </ImageContainer>
          </Card>
          <Card p={`${rem("20px")} ${rem("20px")} 0 ${rem("20px")}`}>
            <Text size="large" mb={spacing.s2}>
              Forms
            </Text>
            <Text size="medium" fontWeight={400} muted maxWidth="32ch">
              Lorem ipsum dolor sit amet, ipsum dolor sit amet dolor set amet.
            </Text>
            <ImageContainer>
              <Image src={image?.src} alt={image?.alt} />
            </ImageContainer>
          </Card>
        </Cards>
      </ContentContainer>
    </Container>
  );
};

export default AppsHero;
