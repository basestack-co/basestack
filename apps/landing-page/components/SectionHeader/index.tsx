import React from "react";
import { useTheme } from "styled-components";
import { useMedia } from "react-use";
// Components
import { Text } from "@basestack/design-system";
import { Container, Title } from "./styles";

export interface SectionHeaderProps {
  title: string;
  text: string;
  titleSize?: "normal" | "large";
  hasMarginBottom?: boolean;
  isDarkMode?: boolean;
  hasAnimatedText?: boolean;
}

const SectionHeader = ({
  title,
  text,
  titleSize = "normal",
  hasMarginBottom = true,
  isDarkMode = false,
  hasAnimatedText = false,
}: SectionHeaderProps) => {
  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.md, false);

  return (
    <Container hasMarginBottom={hasMarginBottom}>
      <Title
        lineHeight="1.3"
        textAlign="center"
        mb={theme.spacing.s2}
        color={isDarkMode ? theme.colors.gray50 : theme.colors.black}
        titleSize={titleSize}
        hasAnimatedText={hasAnimatedText}
      >
        {title}
      </Title>
      <Text
        size={isMobile ? "large" : "xLarge"}
        fontWeight={400}
        textAlign="center"
        lineHeight="1.6"
        // @ts-ignore
        as="p"
        color={isDarkMode ? theme.colors.gray300 : theme.colors.gray500}
      >
        {text}
      </Text>
    </Container>
  );
};

export default SectionHeader;
