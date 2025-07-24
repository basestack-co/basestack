// Components
import {
  Card,
  CardVariant,
  Label,
  Switch,
  Text,
} from "@basestack/design-system";
import React from "react";
// Styles
import { useTheme } from "styled-components";
import {
  ContentContainer,
  Overlay,
  RightColumn,
  TagContainer,
  TextContainer,
} from "./styles";

export interface SwitchSettingCardProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: CardVariant;
  hasOverlay?: boolean;
  label?: string;
}

const SwitchSettingCard = ({
  checked,
  onChange,
  title,
  description,
  variant = CardVariant.DEFAULT,
  hasOverlay = false,
  label,
}: SwitchSettingCardProps) => {
  const theme = useTheme();

  return (
    <Card position="relative" variant={variant} p={theme.spacing.s5}>
      {hasOverlay && <Overlay />}
      <ContentContainer hasLabel={!!label}>
        <TextContainer>
          <Text size="large">{title}</Text>
          <Text>{description}</Text>
        </TextContainer>
        <RightColumn hasLabel={!!label}>
          {!!label && (
            <TagContainer>
              <Label text={label} variant="info" isTranslucent />
            </TagContainer>
          )}
          <Switch checked={checked} onChange={onChange} />
        </RightColumn>
      </ContentContainer>
    </Card>
  );
};

export default SwitchSettingCard;
