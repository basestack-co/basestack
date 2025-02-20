import React, { useState, useRef, useEffect, useCallback } from "react";
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
  Embla,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  ButtonsContainer,
} from "./styles";
import SlideCard from "../SlideCard";
import Image from "../Image";
import SectionHeader from "../SectionHeader";

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

const ANIMATION_TIME = 20000;

const AppsHero = ({ title, text, data, id = "apps-hero" }: SliderProps) => {
  const { isDarkMode, device } = useTheme();
  const isMobile = useMedia(device.max.sm, false);
  const isDesktop = useMedia(device.min.lg, true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  const [emblaImagesRef, emblaImagesApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });

  // Scroll to the selected slide when clicking on a card
  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
      if (emblaImagesApi) emblaImagesApi.scrollTo(index);
      setCurrentIndex(index);
    },
    [emblaApi, emblaImagesApi],
  );

  // Update the active index when dragging
  useEffect(() => {
    if (!emblaImagesApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaImagesApi.selectedScrollSnap());
      if (emblaApi) emblaApi.scrollTo(emblaImagesApi.selectedScrollSnap());
    };

    emblaImagesApi?.on("select", onSelect);
    onSelect();

    return () => {
      emblaImagesApi?.off("select", onSelect);
    };
  }, [emblaImagesApi, emblaApi]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi) {
        const nextIndex = (currentIndex + 1) % data.length;
        scrollTo(nextIndex);
      }
    }, ANIMATION_TIME);

    return () => clearInterval(interval);
  }, [emblaApi, currentIndex, data.length, scrollTo]);

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
        <Embla isImageSlider={false}>
          <EmblaViewport ref={emblaRef} isImageSlider={false}>
            <EmblaContainer>
              {data?.map((item, index) => (
                <EmblaSlide key={`card-${index}`} isImageSlider={false}>
                  <SlideCard
                    isActive={index === currentIndex}
                    icon={item.icon}
                    title={item.title}
                    animationTime={ANIMATION_TIME}
                    text={item.text}
                    onClick={() => {
                      events.landing.slider(item.title, item.text);
                      scrollTo(index);
                    }}
                  />
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>

        <Embla isImageSlider>
          <EmblaViewport ref={emblaImagesRef} isImageSlider>
            <EmblaContainer>
              {data?.map((item, index) => (
                <EmblaSlide key={`image-${index}`} isImageSlider>
                  <Image src={item.image.src} alt={item.image.alt} />
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>
      </ContentContainer>
    </Container>
  );
};

export default AppsHero;
