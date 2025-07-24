import React from "react";
import { useTheme } from "styled-components";
import { Text } from "@basestack/design-system";
import { Container, StyledCaption, Title } from "./styles";
import { Label } from "../styles";

type TitleSize = "medium" | "large" | "xLarge";
type TextAlign = "left" | "center" | "right";
type AlignItems = "flex-end" | "center" | "flex-start";

interface SectionHeaderProps {
  title: string;
  text?: string;
  titleSize?: TitleSize;
  hasMarginBottom?: boolean;
  hasAnimatedText?: boolean;
  textAlign?: TextAlign;
  alignItems?: AlignItems;
  label?: string;
  textMaxWidth?: number | "initial";
  titleMaxWidth?: number | "initial";
  titleTag?: string;
  caption?: string;
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
  caption,
}: SectionHeaderProps) => {
  const { spacing, colors, isDarkMode, typography } = useTheme();

  return (
    <Container hasMarginBottom={hasMarginBottom} alignItems={alignItems}>
      {caption && (
        <StyledCaption
          size="medium"
          fontWeight={400}
          mb={spacing.s3}
          color={colors.blue400}
          // @ts-expect-error
          fontFamily={typography.robotoMono}
        >
          {caption.toUpperCase()}
        </StyledCaption>
      )}
      {label && (
        <Label>
          <Text size="xSmall">{label}</Text>
        </Label>
      )}
      <Title
        as={titleTag}
        lineHeight="1.3"
        textAlign={textAlign}
        mb={spacing.s3}
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

export type { TitleSize, TextAlign, AlignItems, SectionHeaderProps };
export default SectionHeader;
