import React from "react";
import { useTheme } from "styled-components";
// Components
import Card from "../Card";
import { CardsContainer, Container, ContentContainer } from "./styles";
import SectionHeader from "../SectionHeader";

export interface CardsProps {
  id?: string;
  title: string;
  text: string;
  cards: Array<{
    title: string;
    text: string;
    icon: string;
  }>;
}

const Cards = ({ title, text, cards, id = "card" }: CardsProps) => {
  return (
    <Container id={id}>
      <ContentContainer>
        <SectionHeader title={title} text={text} />
        <CardsContainer>
          {cards?.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              text={card.text}
              icon={card.icon}
            />
          ))}
        </CardsContainer>
      </ContentContainer>
    </Container>
  );
};

export default Cards;
