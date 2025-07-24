import React from "react";
import SectionHeader from "../SectionHeader";
import CardComp from "./Card";
import {
  Container,
  ContentContainer,
  HeaderContainer,
  List,
  ListItem,
} from "./styles";

export interface OrderedCardsProps {
  id?: string;
  title: string;
  caption?: string;
  text?: string;
  data: Array<{ title: string; text: string; icon: string }>;
}

const OrderedCards = ({
  id,
  title,
  text,
  data,
  caption,
}: OrderedCardsProps) => {
  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} caption={caption} />
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
                order={index % 2 === 0 ? "normal" : "inverse"}
              />
            </ListItem>
          ))}
        </List>
      </ContentContainer>
    </Container>
  );
};

export default OrderedCards;
