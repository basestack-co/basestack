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
  hasAnimatedText?: boolean;
  maxWidth?: number | string;
}

const SectionHeader = ({
  title,
  text,
  titleSize = "normal",
  hasMarginBottom = true,
  hasAnimatedText = false,
  maxWidth = 720,
}: SectionHeaderProps) => {
  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.md, false);

  return (
    <Container hasMarginBottom={hasMarginBottom} maxWidth={maxWidth}>
      <Title
        lineHeight="1.3"
        textAlign="center"
        mb={theme.spacing.s2}
        color={theme.colors.black}
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
        color={theme.colors.gray500}
      >
        {text}
      </Text>
    </Container>
  );
};

export default SectionHeader;
