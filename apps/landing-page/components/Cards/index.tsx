import React from "react";
import { useTheme } from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import { useMedia } from "react-use";
import Card from "../Card";
import {
  Container,
  ContentContainer,
  Embla,
  EmblaViewport,
  EmblaSlide,
  EmblaContainer,
  HeaderContainer,
} from "./styles";
import SectionHeader from "../SectionHeader";
import CarouselButtons from "../CarouselButtons";

export interface CardsProps {
  id?: string;
  title: string;
  text?: string;
  cards: Array<{
    title: string;
    text: string;
    icon: string;
  }>;
}

const Cards = ({ title, text, cards, id }: CardsProps) => {
  const { device } = useTheme();
  const isDesktop = useMedia(device.min.lg, true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} />
        </HeaderContainer>
        <Embla>
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {cards?.map((card, index) => (
                <EmblaSlide key={index}>
                  <Card title={card.title} text={card.text} icon={card.icon} />
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>
        <CarouselButtons emblaApi={emblaApi} hasMarginTop />
      </ContentContainer>
    </Container>
  );
};

export default Cards;
