import React from "react";
import { useTheme } from "styled-components";
// Components
import { Icon, Text } from "@basestack/design-system";
import {
  Card,
  TextContainer,
  ProviderContainer,
  IconContainer,
} from "./styles";

export interface ProviderCardProps {
  title: string;
  text: string;
  onClick: () => void;
  providerLogo?: React.ReactElement;
}

const ProviderCard = ({
  title,
  text,
  onClick,
  providerLogo,
}: ProviderCardProps) => {
  const { colors, isDarkMode } = useTheme();

  return (
    <Card onClick={onClick}>
      <ProviderContainer hasProviderLogo={!!providerLogo}>
        {providerLogo ? (
          providerLogo
        ) : (
          <Icon
            icon="domain"
            size="xLarge"
            color={colors[isDarkMode ? "gray400" : "black"]}
          />
        )}
      </ProviderContainer>
      <TextContainer>
        <Text size="large">{title}</Text>
        <Text muted size="medium" fontWeight={400} lineHeight={1.6}>
          {text}
        </Text>
      </TextContainer>
      <IconContainer className="arrow-icon">
        <Icon
          icon="arrow_forward"
          size="medium"
          color={colors[isDarkMode ? "gray300" : "primary"]}
        />
      </IconContainer>
    </Card>
  );
};

export default ProviderCard;
