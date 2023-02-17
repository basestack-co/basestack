import React, { useState } from "react";
import { animated, config, useTransition } from "react-spring";
// Components
import { Text, Icon } from "@basestack/design-system";
import { Container, Header, ContentContainer, ContentWrapper } from "./styles";

export interface AccordionProps {
  title: string;
  text: string;
}

const AnimatedContent = animated(ContentContainer);

const Accordion = ({ title, text }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const transitionContent = useTransition(isOpen, {
    config: { ...config.stiff, duration: 200 },
    from: { opacity: 0, maxHeight: "0" },
    enter: { opacity: 1, maxHeight: "100px" },
    leave: { opacity: 0, maxHeight: "0" },
  });

  return (
    <Container>
      <Header onClick={() => setIsOpen((prev) => !prev)}>
        <Text size="large" textAlign="left">
          {title}
        </Text>
        <Icon size="large" icon={isOpen ? "expand_less" : "expand_more"} />
      </Header>
      {transitionContent(
        (styles, item) =>
          item && (
            <AnimatedContent style={styles}>
              <ContentWrapper>
                <Text
                  muted
                  size="medium"
                  fontWeight={400}
                  lineHeight={1.4}
                  textAlign="left"
                >
                  {text}
                </Text>
              </ContentWrapper>
            </AnimatedContent>
          )
      )}
    </Container>
  );
};

export default Accordion;
