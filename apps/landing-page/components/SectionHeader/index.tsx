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
  const { device, spacing, colors, isDarkMode } = useTheme();
  const isMobile = useMedia(device.max.md, false);
  const descriptionSize = titleSize === "large" ? "xLarge" : "large";

  return (
    <Container hasMarginBottom={hasMarginBottom} maxWidth={maxWidth}>
      <Title
        lineHeight="1.3"
        textAlign="center"
        mb={spacing.s2}
        color={isDarkMode ? colors.gray300 : colors.black}
        titleSize={titleSize}
        hasAnimatedText={hasAnimatedText}
      >
        {title}
      </Title>
      <Text
        size={isMobile ? "large" : descriptionSize}
        fontWeight={400}
        textAlign="center"
        lineHeight="1.6"
        as="p"
        muted
      >
        {text}
      </Text>
    </Container>
  );
};

export default SectionHeader;
