import React from "react";
import { useTheme } from "styled-components";
import { Text, Icon } from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  NumberContainer,
  TextContainer,
  TextContentContainer,
  NumberWrapper,
  IconContainer,
} from "./styles";

export interface CardProps {
  title: string;
  text: string;
  number: number;
  isFirst?: boolean;
  icon: string;
  isLast?: boolean;
}

const CardComp = ({
  title,
  text,
  number = 1,
  isFirst = false,
  isLast = false,
  icon = "help",
}: CardProps) => {
  const { spacing } = useTheme();

  return (
    <Container>
      <ContentContainer>
        <NumberContainer isFirst={isFirst} isLast={isLast}>
          <NumberWrapper>
            <Text size="medium" fontWeight={400} muted>
              {number}
            </Text>
          </NumberWrapper>
        </NumberContainer>

        <TextContainer>
          <IconContainer>
            <Icon icon={icon} muted />
          </IconContainer>
          <TextContentContainer>
            <Text size="xLarge" mb={spacing.s1}>
              {title}
            </Text>
            <Text size="medium" fontWeight={400} lineHeight={1.6} muted>
              {text}
            </Text>
          </TextContentContainer>
        </TextContainer>
      </ContentContainer>
    </Container>
  );
};

export default CardComp;
