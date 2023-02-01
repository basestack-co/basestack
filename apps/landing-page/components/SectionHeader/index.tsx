import React from "react";
import { rem } from "polished";
import { useTheme } from "styled-components";
// Components
import { Text } from "@basestack/design-system";
import { Container } from "./styles";

export interface SectionHeaderProps {
  title: string;
  text: string;
  titleSize?: "normal" | "large";
  hasMarginBottom?: boolean;
  isDarkMode?: boolean;
}

const SectionHeader = ({
  title,
  text,
  titleSize = "normal",
  hasMarginBottom = true,
  isDarkMode = false,
}: SectionHeaderProps) => {
  const theme = useTheme();

  return (
    <Container hasMarginBottom={hasMarginBottom}>
      <Text
        size="xxLarge"
        fontSize={titleSize === "normal" ? rem("42px") : rem("60px")}
        lineHeight="1.4"
        mb={theme.spacing.s2}
        // @ts-ignore
        as={titleSize === "normal" ? "h2" : "h1"}
        color={isDarkMode ? theme.colors.gray50 : theme.colors.black}
      >
        {title}
      </Text>
      <Text
        size="xLarge"
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
