import React from "react";
import Card from "./Card";
import { Container, ContentContainer, Grid, HeaderContainer } from "./styles";
import SectionHeader from "../SectionHeader";

export interface CardsProps {
  id?: string;
  title: string;
  caption?: string;
  text?: string;
  cards: Array<{
    title: string;
    description?: string;
    icon: string;
  }>;
}

const MiniCards = ({ title, text, cards, id, caption }: CardsProps) => (
  <Container id={id}>
    <ContentContainer>
      <HeaderContainer>
        <SectionHeader title={title} text={text} caption={caption} />
      </HeaderContainer>
      <Grid>
        {cards?.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            icon={card.icon}
            description={card.description}
          />
        ))}
      </Grid>
    </ContentContainer>
  </Container>
);

export default MiniCards;
