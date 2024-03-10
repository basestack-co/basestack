import React from "react";
// Components
import { Card, Switch, Text } from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
import { ContentContainer, TextContainer } from "./styles";

export interface SwitchSettingCardProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SwitchSettingCard = ({
  checked,
  onChange,
  title,
  description,
}: SwitchSettingCardProps) => {
  const theme = useTheme();

  return (
    <Card p={theme.spacing.s5}>
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
