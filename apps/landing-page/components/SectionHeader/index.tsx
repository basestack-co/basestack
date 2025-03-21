import React from "react";
import { useTheme } from "styled-components";
import { Text } from "@basestack/design-system";
import { Container, Title } from "./styles";
import { Label } from "../styles";

type TitleSize = "medium" | "large" | "xLarge";

export interface SectionHeaderProps {
  title: string;
  text?: string;
  titleSize?: TitleSize;
  hasMarginBottom?: boolean;
  hasAnimatedText?: boolean;
  textAlign?: "left" | "center" | "right";
  alignItems?: "flex-end" | "center" | "flex-start";
  label?: string;
  textMaxWidth?: number | "initial";
  titleMaxWidth?: number | "initial";
  titleTag?: string;
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
  hasAnimatedText = false,
  titleTag = "h2",
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
        as={titleTag}
        lineHeight="1.3"
        textAlign={textAlign}
        mb={spacing.s2}
        color={isDarkMode ? colors.gray300 : colors.black}
        titleSize={titleSize}
        titleMaxWidth={titleMaxWidth}
        hasAnimatedText={hasAnimatedText}
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
