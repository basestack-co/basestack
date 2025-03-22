import React from "react";
import SectionHeader from "../SectionHeader";
import {
  Container,
  ContentContainer,
  HeaderContainer,
  List,
  ListItem,
} from "./styles";
import CardComp, { CardProps } from "./Card";

export interface OrderedCardsProps {
  id?: string;
  title: string;
  text?: string;
  data: Array<Omit<CardProps, "number" | "isFirst" | "isLast">>;
}

const OrderedCards = ({ id, title, text, data }: OrderedCardsProps) => {
  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} />
        </HeaderContainer>
        <List>
          {data.map((item, index, { length }) => (
            <ListItem key={index}>
              <CardComp
                title={item.title}
                text={item.text}
                icon={item.icon}
                number={index + 1}
                isFirst={index === 0}
                isLast={index + 1 === length}
              />
            </ListItem>
          ))}
        </List>
      </ContentContainer>
    </Container>
  );
};

export default OrderedCards;
