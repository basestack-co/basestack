import React, { useEffect, useRef } from "react";
import { Text } from "@basestack/design-system";
import { animated, useSpring } from "react-spring";
import { BodyContainer, BodyValue, BodyWrapper, Box } from "./styles";
import { FormSubmissionBodyProps } from "./types";

const AnimatedBody = animated(BodyContainer);

const Body = ({ isOpen, data }: FormSubmissionBodyProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [style, animate] = useSpring(
    () => ({
      opacity: 0,
      height: 0,
      config: { duration: 200 },
    }),
    [],
  );

  useEffect(() => {
    if (contentRef.current) {
      animate.start({
        height: isOpen ? contentRef.current.offsetHeight + 20 : 0,
        opacity: isOpen ? 1 : 0,
      });
    }
  }, [animate, isOpen]);

  return (
    <AnimatedBody style={style}>
      <BodyWrapper ref={contentRef}>
        {data.map((item, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Text muted>{item.title}</Text>
            <BodyValue>
              <Text>{item.description}</Text>
            </BodyValue>
          </Box>
        ))}
      </BodyWrapper>
    </AnimatedBody>
  );
};

export default Body;
