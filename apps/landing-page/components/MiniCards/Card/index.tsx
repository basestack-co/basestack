import React from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
import { Text, IconBox } from "@basestack/design-system";
import { Card } from "../../styles";
import {
  ContentContainer,
  TextContainer,
  InnerContentContainer,
  CardContainer,
} from "./styles";

export interface CardProps {
  title: string;
  description?: string;
  icon?: string;
}

const CardComp = ({ title, description, icon = "help" }: CardProps) => {
  const { colors, spacing, isDarkMode } = useTheme();

  const iconBoxProps = isDarkMode
    ? {
        iconColor: colors.gray300,
        outlinedBg: colors.gray800,
        gradient: [
          colors.gray800,
          colors.gray600,
          colors.gray500,
          colors.gray800,
        ],
      }
    : {};

  return (
    <CardContainer>
      <Card p={`${rem("24px")} ${spacing.s5}`}>
        <ContentContainer>
          <IconBox size="large" icon={icon} mb={spacing.s5} {...iconBoxProps} />
          <TextContainer>
            <Text size="large" textAlign="center">
              {title}
            </Text>
          </TextContainer>
        </ContentContainer>

        {description && (
          <InnerContentContainer className="inner-content">
            <Text size="large" textAlign="center" mb={spacing.s2}>
              {title}
            </Text>
            <Text size="medium" fontWeight={400} textAlign="center" muted>
              {description}
            </Text>
          </InnerContentContainer>
        )}
      </Card>
    </CardContainer>
  );
};

export default CardComp;
