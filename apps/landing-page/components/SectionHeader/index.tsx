import React from "react";
import { rem } from "polished";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@basestack/hooks";
// Components
import { Text } from "@basestack/design-system";
import { AnimatedText, Container } from "./styles";

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
  const isMobile = useMediaQuery(theme.device.max.md);

  const TitleComponent = hasAnimatedText ? AnimatedText : Text;

  return (
    <Container hasMarginBottom={hasMarginBottom}>
      <TitleComponent
        size="xxLarge"
        fontSize={
          isMobile
            ? rem("32px")
            : titleSize === "normal"
            ? rem("42px")
            : rem("60px")
        }
        lineHeight="1.3"
        textAlign="center"
        mb={theme.spacing.s2}
        // @ts-ignore
        fontFamily={theme.typography.robotoFlex}
        as={titleSize === "normal" ? "h2" : "h1"}
        color={isDarkMode ? theme.colors.gray50 : theme.colors.black}
      >
        {title}
      </TitleComponent>
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
