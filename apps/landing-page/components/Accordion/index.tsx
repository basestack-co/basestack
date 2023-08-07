import React, { useState } from "react";
import { animated, config, useTransition } from "react-spring";
import { useTheme } from "styled-components";
// Components
import { Text, Icon } from "@basestack/design-system";
import { Container, Header, ContentContainer, ContentWrapper } from "./styles";

export interface AccordionProps {
  title: string;
  text: string;
  onClick?: () => void;
}

const AnimatedContent = animated(ContentContainer);

const Accordion = ({ title, text, onClick }: AccordionProps) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const transitionContent = useTransition(isOpen, {
    config: { ...config.stiff, duration: 300 },
    from: { opacity: 0, maxHeight: "0" },
    enter: { opacity: 1, maxHeight: "500px" },
    leave: { opacity: 0, maxHeight: "0" },
  });

  return (
    <Container>
      <Header
        onClick={() => {
          setIsOpen((prev) => !prev);

          if (onClick) {
            onClick();
          }
        }}
      >
        <Text size="large" textAlign="left" color={theme.colors.gray300}>
          {title}
        </Text>
        <Icon
          color={theme.colors.gray300}
          size="large"
          icon={isOpen ? "expand_less" : "expand_more"}
        />
      </Header>
      {transitionContent(
        (styles, item) =>
          item && (
            <AnimatedContent style={styles}>
              <ContentWrapper>
                <Text
                  color={theme.colors.gray50}
                  size="medium"
                  fontWeight={400}
                  lineHeight={1.4}
                  textAlign="left"
                >
                  {text}
                </Text>
              </ContentWrapper>
            </AnimatedContent>
          ),
      )}
    </Container>
  );
};

export default Accordion;
