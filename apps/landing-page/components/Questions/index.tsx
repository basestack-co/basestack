// Components
import { Accordion } from "@basestack/design-system";
import SectionHeader from "../SectionHeader";
import { AccordionsContainer, Container, ContentContainer } from "./styles";

export interface QuestionsProps {
  id?: string;
  title: string;
  caption?: string;
  text: string;
  data: Array<{ title: string; text: string }>;
}

const Questions = ({ title, text, data, id, caption }: QuestionsProps) => {
  return (
    <Container id={id}>
      <ContentContainer>
        <SectionHeader title={title} text={text} caption={caption} />
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
