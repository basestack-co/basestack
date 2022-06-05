import React from "react";
import { useTheme } from "styled-components";
import { Text, Button, Icon } from "design-system";
import { Variant as ButtonVariant } from "design-system/atoms/Button/types";
import { IconContainer, StyledCard } from "./styles";

interface GetStartedCardProps {
  title: string;
  description: string;
  button: {
    text: string;
    onClick: () => void;
    variant: ButtonVariant;
  };
  icon: {
    name: string;
    color: string;
    bg: string;
  };
}

const GetStartedCard = ({
  button,
  icon,
  title,
  description,
}: GetStartedCardProps) => {
  const theme = useTheme();

  return (
    <StyledCard hasHoverAnimation p={theme.spacing.s5}>
      <IconContainer bg={icon.bg}>
        <Icon icon={icon.name} color={icon.color} />
      </IconContainer>
      <Text size="large" mb={theme.spacing.s2}>
        {title}
      </Text>
      <Text muted size="small" mb={theme.spacing.s6}>
        {description}
      </Text>
      <Button mt="auto" variant={button.variant} onClick={button.onClick}>
        {button.text}
      </Button>
    </StyledCard>
  );
};

export default GetStartedCard;
