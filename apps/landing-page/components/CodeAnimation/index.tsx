import React, { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { useSpring, animated } from "@react-spring/web";
import { Container, TextWrapper, Text } from "./styles";

type TextType = "colon" | "comma" | "key" | "value";

interface TextPart {
  type: TextType;
  content: string;
}

const textParts: TextPart[] = [
  { type: "key", content: '"fontSize"' },
  { type: "colon", content: ":" },
  { type: "value", content: ' "16px"' },
  { type: "comma", content: ", " },
  { type: "key", content: '"color"' },
  { type: "colon", content: ":" },
  { type: "value", content: ' "#05944f"' },
];

const characters = textParts.flatMap((part) =>
  part.content.split("").map((char) => ({ char, type: part.type })),
);

const getTypingDelay = (char: string) => {
  if (char === " ") return 100;
  if (char === "," || char === ":") return 250;
  const baseDelay = 60;
  const variation = Math.floor(Math.random() * 80);
  return baseDelay + variation;
};

const AnimatedSpan = animated(TextWrapper);

const CodeAnimation: React.FC = () => {
  const { colors, isDarkMode } = useTheme();
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const styles: Record<TextType, React.CSSProperties> = {
    colon: { color: isDarkMode ? colors.gray300 : colors.black },
    comma: { color: isDarkMode ? colors.gray300 : colors.black },
    key: { color: isDarkMode ? colors.blue300 : colors.blue500 },
    value: { color: isDarkMode ? colors.orange300 : colors.orange500 },
  };

  const cursorStyles = useSpring({
    opacity: isPaused ? 1 : 0,
    from: { opacity: isPaused ? 1 : 0 },
    to: { opacity: 1 },
    config: { duration: 800 },
    loop: true,
    delay: 400,
  });

  useEffect(() => {
    if (visibleCount < characters.length) {
      setIsPaused(true);

      const char = characters[visibleCount]?.char ?? "";
      const timeout = setTimeout(
        () => {
          setVisibleCount((prev) => prev + 1);
        },
        // @ts-expect-error - getTypingDelay is not typed
        getTypingDelay(char, visibleCount),
      );

      return () => clearTimeout(timeout);
    } else {
      setIsPaused(false);

      const resetTimeout = setTimeout(() => {
        setVisibleCount(0);
      }, 15000);

      return () => clearTimeout(resetTimeout);
    }
  }, [visibleCount]);

  return (
    <Container>
      <Text>
        <TextWrapper>{"{"}</TextWrapper>
        {characters.slice(0, visibleCount).map((item, index) => (
          <TextWrapper key={index} style={styles[item.type]}>
            {item.char}
          </TextWrapper>
        ))}
        <AnimatedSpan style={{ ...cursorStyles }}>|</AnimatedSpan>
        <TextWrapper>{"}"}</TextWrapper>
      </Text>
    </Container>
  );
};

export default CodeAnimation;
