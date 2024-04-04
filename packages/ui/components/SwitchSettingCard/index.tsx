import React from "react";
// Components
import { Card, Switch, Text, CardVariant } from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
import { ContentContainer, Overlay, TextContainer } from "./styles";

export interface SwitchSettingCardProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: CardVariant;
  hasOverlay?: boolean;
}

const SwitchSettingCard = ({
  checked,
  onChange,
  title,
  description,
  variant = CardVariant.DEFAULT,
  hasOverlay = false,
}: SwitchSettingCardProps) => {
  const theme = useTheme();

  return (
    <Card position="relative" variant={variant} p={theme.spacing.s5}>
      {hasOverlay && <Overlay />}
      <ContentContainer>
        <TextContainer>
          <Text size="large">{title}</Text>
          <Text>{description}</Text>
        </TextContainer>
        <Switch ml={theme.spacing.s5} checked={checked} onChange={onChange} />
      </ContentContainer>
    </Card>
  );
};

export default SwitchSettingCard;
