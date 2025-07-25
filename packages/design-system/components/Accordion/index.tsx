import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import Icon from "../Icon";
// Components
import Text from "../Text";
import { Container, ContentContainer, ContentWrapper, Header } from "./styles";

export interface AccordionProps {
  title: string;
  text: string;
  onClick?: () => void;
}

const AnimatedContent = animated(ContentContainer);

const Accordion = ({ title, text, onClick }: AccordionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [style, animate] = useSpring(
    () => ({ opacity: 0, height: 0, config: { duration: 200 } }),
    [],
  );

  useEffect(() => {
    if (contentRef.current) {
      animate.start({
        height: isOpen ? contentRef.current.offsetHeight : 0,
        opacity: isOpen ? 1 : 0,
      });
    }
  }, [animate, isOpen]);

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
        <Text size="large" textAlign="left">
          {title}
        </Text>
        <Icon size="large" icon={isOpen ? "expand_less" : "expand_more"} />
      </Header>
      <AnimatedContent style={style}>
        <ContentWrapper ref={contentRef}>
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
    </Container>
  );
};

export default Accordion;
