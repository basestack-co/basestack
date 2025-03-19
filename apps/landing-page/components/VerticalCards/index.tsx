import React from "react";
import { useTheme } from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import { useMedia } from "react-use";
import Card, { CardProps } from "./Card";
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

export interface VerticalCardsProps {
  id?: string;
  title: string;
  text?: string;
  cards: Array<CardProps>;
}

const VerticalCards = ({ title, text, cards, id }: VerticalCardsProps) => {
  const { device } = useTheme();
  const isDesktop = useMedia(device.min.lg, true);

  const [emblaRef] = useEmblaCarousel({
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
                  <Card {...card} />
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>
      </ContentContainer>
    </Container>
  );
};

export default VerticalCards;
