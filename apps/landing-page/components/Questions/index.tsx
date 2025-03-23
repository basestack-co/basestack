import React from "react";
// Components
import { Accordion } from "@basestack/design-system";
import { AccordionsContainer, Container, ContentContainer } from "./styles";
import SectionHeader from "../SectionHeader";

export interface QuestionsProps {
  id?: string;
  title: string;
  text: string;
  data: Array<{ title: string; text: string }>;
}

const Questions = ({ title, text, data, id }: QuestionsProps) => {
  return (
    <Container id={id}>
      <ContentContainer>
        <SectionHeader title={title} text={text} />
        <AccordionsContainer>
          {data?.map((item, index) => (
            <Accordion key={index} title={item.title} text={item.text} />
          ))}
        </AccordionsContainer>
      </ContentContainer>
    </Container>
  );
};

export default Questions;
