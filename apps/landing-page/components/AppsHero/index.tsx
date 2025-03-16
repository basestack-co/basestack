import React, { useCallback, useRef, useState } from "react";
import { useTheme } from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import { Button, ButtonSize, ButtonVariant } from "@basestack/design-system";
import { useMedia } from "react-use";
// Utils
import { events } from "@basestack/utils";
// Components
import {
  ButtonsContainer,
  Container,
  ContentContainer,
  HeaderContainer,
  StyledImageContainer,
} from "./styles";
import Image from "../Image";
import SectionHeader from "../SectionHeader";
import CardSlider from "./CardSilder";

export interface SliderProps {
  id?: string;
  title: string;
  text: string;
  actions: Array<{
    id: string;
    text: string;
    href: string;
    isTertiary?: boolean;
  }>;
  data: Array<{
    icon: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
    isDisabled?: boolean;
  }>;
}

const AppsHero = ({
  title,
  text,
  data,
  id = "apps-hero",
  actions,
}: SliderProps) => {
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
            {actions.map(({ id, text, isTertiary, href }) => {
              return (
                <Button
                  key={id}
                  justifyContent="center"
                  fullWidth={isMobile}
                  onClick={() => {
                    events.landing.deploy(text);
                    if (typeof window !== "undefined") {
                      window.open(href, "_blank");
                    }
                  }}
                  size={ButtonSize.Medium}
                  {...(isTertiary
                    ? {
                        variant: isDarkMode
                          ? ButtonVariant.Tertiary
                          : ButtonVariant.Secondary,
                      }
                    : {})}
                >
                  {text}
                </Button>
              );
            })}
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

        <StyledImageContainer>
          <Image
            src={data[currentIndex].image.src}
            alt={data[currentIndex].image.alt}
          />
        </StyledImageContainer>
      </ContentContainer>
    </Container>
  );
};

export default AppsHero;
