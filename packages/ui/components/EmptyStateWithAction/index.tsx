import React from "react";
import { useTheme } from "styled-components";
import {
  Text,
  Button,
  Card,
  ButtonVariant,
  IconBox,
} from "@basestack/design-system";

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
  };
}

const EmptyStateWithAction = ({
  button,
  icon,
  title,
  description,
}: GetStartedCardProps) => {
  const theme = useTheme();

  return (
    <Card hasHoverAnimation p={theme.spacing.s5}>
      <IconBox icon={icon.name} mb={theme.spacing.s5} />
      <Text size="large" mb={theme.spacing.s2}>
        {title}
      </Text>
      <Text muted size="small" mb={theme.spacing.s6}>
        {description}
      </Text>
      <Button mt="auto" variant={button.variant} onClick={button.onClick}>
        {button.text}
      </Button>
    </Card>
  );
};

export default EmptyStateWithAction;
