import React, { useState, useRef, useCallback } from "react";
import { useTheme } from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import { Button, ButtonSize, ButtonVariant } from "@basestack/design-system";
import { useMedia } from "react-use";
// Utils
import { config, events } from "@basestack/utils";
// Components
import {
  Container,
  ContentContainer,
  HeaderContainer,
  ButtonsContainer,
  ImagesContainer,
} from "./styles";
import Image from "../Image";
import SectionHeader from "../SectionHeader";
import CardSlider from "./CardSilder";

export interface SliderProps {
  id?: string;
  title: string;
  text: string;
  data: Array<{
    icon: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
  }>;
}

const AppsHero = ({ title, text, data, id = "apps-hero" }: SliderProps) => {
  const { isDarkMode, device, spacing } = useTheme();
  const isMobile = useMedia(device.max.sm, false);
  const isDesktop = useMedia(device.min.lg, true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  // Scroll to the selected slide when clicking on a card
  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
      setCurrentIndex(index);
    },
    [emblaApi],
  );

  return (
    <Container ref={containerRef} id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} hasMarginBottom={false} />
          <ButtonsContainer>
            <Button
              justifyContent="center"
              fullWidth={isMobile}
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
            <Button
              justifyContent="center"
              fullWidth={isMobile}
              variant={
                isDarkMode ? ButtonVariant.Tertiary : ButtonVariant.Secondary
              }
              size={ButtonSize.Medium}
              onClick={() => {
                events.landing.deploy("Explore more options");
                if (typeof window !== "undefined") {
                  window.open(
                    `${config.urls.docs.base}/self-hosting`,
                    "_blank",
                  );
                }
              }}
            >
              Explore more options
            </Button>
          </ButtonsContainer>
        </HeaderContainer>

        <CardSlider
          ref={emblaRef}
          data={data}
          onClick={(index) => {
            events.landing.slider(data[index].title, data[index].text);
            scrollTo(index);
          }}
          currentIndex={currentIndex}
        />

        <ImagesContainer>
          <Image
            src={data[currentIndex].image.src}
            alt={data[currentIndex].image.alt}
          />
        </ImagesContainer>
      </ContentContainer>
    </Container>
  );
};

export default AppsHero;
