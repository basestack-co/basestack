import React from "react";
import { useTheme } from "styled-components";
// Components
import { Text } from "@basestack/design-system";
import { Container, Label, Title } from "./styles";

export interface SectionHeaderProps {
  title: string;
  text?: string;
  titleSize?: "medium" | "large";
  hasMarginBottom?: boolean;
  hasAnimatedText?: boolean;
  textAlign?: "left" | "center" | "right";
  alignItems?: "flex-end" | "center" | "flex-start";
  label?: string;
  textMaxWidth?: number | "initial";
  titleMaxWidth?: number | "initial";
}

const SectionHeader = ({
  title,
  text,
  titleSize = "large",
  hasMarginBottom = true,
  textAlign = "center",
  alignItems = "center",
  label,
  textMaxWidth = 80,
  titleMaxWidth = "initial",
}: SectionHeaderProps) => {
  const { spacing, colors, isDarkMode } = useTheme();

  return (
    <Container hasMarginBottom={hasMarginBottom} alignItems={alignItems}>
      {label && (
        <Label>
          <Text size="xSmall">{label}</Text>
        </Label>
      )}
      <Title
        lineHeight="1.3"
        textAlign={textAlign}
        mb={spacing.s2}
        color={isDarkMode ? colors.gray300 : colors.black}
        titleSize={titleSize}
        titleMaxWidth={titleMaxWidth}
      >
        {title}
      </Title>
      {text && (
        <Text
          size="large"
          fontWeight={400}
          textAlign={textAlign}
          lineHeight="1.6"
          as="p"
          muted
          maxWidth={
            typeof textMaxWidth === "number" ? `${textMaxWidth}ch` : "initial"
          }
        >
          {text}
        </Text>
      )}
    </Container>
  );
};

export default SectionHeader;
