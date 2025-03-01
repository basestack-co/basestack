import React from "react";
import Card, { CardProps } from "./Card";
import { Container, ContentContainer, Grid, HeaderContainer } from "./styles";
import SectionHeader from "../SectionHeader";

export interface CardsProps {
  id?: string;
  title: string;
  text?: string;
  cards: Array<CardProps>;
}

const BentoCards = ({ title, text, cards, id }: CardsProps) => (
  <Container id={id}>
    <ContentContainer>
      <HeaderContainer>
        <SectionHeader title={title} text={text} />
      </HeaderContainer>
      <Grid>{cards?.map((item, index) => <Card key={index} {...item} />)}</Grid>
    </ContentContainer>
  </Container>
);

export default BentoCards;
