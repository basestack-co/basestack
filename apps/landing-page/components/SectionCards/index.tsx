import React from "react";
import { rem } from "polished";
// Components
import {
  CardContainer,
  Container,
  ContentContainer,
  HeaderContainer,
  Image,
  Row,
  RowsContainer,
  TextContainer,
  TextWrapper,
} from "./styles";
import SectionHeader from "../SectionHeader";
import { Card } from "../styles";

export interface CardsProps {
  id?: string;
  title: string;
  text: string;
  cards: Array<{
    label: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
  }>;
}

const SectionCards = ({ title, text, cards, id }: CardsProps) => (
  <Container id={id}>
    <ContentContainer>
      <HeaderContainer>
        <SectionHeader title={title} text={text} />
      </HeaderContainer>
      <RowsContainer>
        {cards?.map((card, index) => {
          const isEven = index % 2 === 0;
          return (
            <Row key={index} isEven={isEven}>
              <CardContainer>
                <Card
                  p={
                    isEven
                      ? `${rem("30px")} ${rem("30px")} 0 0`
                      : `${rem("30px")} 0 0 ${rem("30px")}`
                  }
                >
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    isEven={isEven}
                  />
                </Card>
              </CardContainer>
              <TextContainer>
                <TextWrapper isEven={isEven}>
                  <SectionHeader
                    label={card.label}
                    title={card.title}
                    text={card.text}
                    titleSize="medium"
                    textAlign="left"
                    alignItems="flex-start"
                    hasMarginBottom={false}
                  />
                </TextWrapper>
              </TextContainer>
            </Row>
          );
        })}
      </RowsContainer>
    </ContentContainer>
  </Container>
);

export default SectionCards;
