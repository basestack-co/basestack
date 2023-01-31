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
}

const SectionHeader = ({
  title,
  text,
  titleSize = "normal",
  hasMarginBottom = true,
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
      >
        {title}
      </Text>
      <Text
        size="xLarge"
        fontWeight={400}
        muted
        textAlign="center"
        lineHeight="1.6"
        // @ts-ignore
        as="p"
      >
        {text}
      </Text>
    </Container>
  );
};

export default SectionHeader;
