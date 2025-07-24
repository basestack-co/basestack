import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import Card from "../Card";
import CarouselButtons from "../CarouselButtons";
import SectionHeader from "../SectionHeader";
import {
  Container,
  ContentContainer,
  Embla,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
  HeaderContainer,
} from "./styles";

export interface CardsProps {
  id?: string;
  caption?: string;
  title: string;
  text?: string;
  cards: Array<{
    title: string;
    text: string;
    icon: string;
  }>;
}

const Cards = ({ title, text, cards, id, caption }: CardsProps) => {
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
          <SectionHeader title={title} text={text} caption={caption} />
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
