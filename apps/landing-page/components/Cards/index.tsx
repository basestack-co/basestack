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
  isDarkMode?: boolean;
}

const Cards = ({
  title,
  text,
  cards,
  isDarkMode = false,
  id = "card",
}: CardsProps) => {
  const theme = useTheme();

  return (
    <Container id={id} isDarkMode={isDarkMode}>
      <ContentContainer>
        <SectionHeader isDarkMode={isDarkMode} title={title} text={text} />
        <CardsContainer>
          {cards?.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              text={card.text}
              icon={card.icon}
              isDarkMode={isDarkMode}
            />
          ))}
        </CardsContainer>
      </ContentContainer>
    </Container>
  );
};

export default Cards;
