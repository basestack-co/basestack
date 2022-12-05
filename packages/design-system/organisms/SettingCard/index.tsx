import React, { memo } from "react";
import { useTheme } from "styled-components";
import { Button, ButtonVariant, HorizontalRule, Text } from "../../atoms";
import { Container, Footer, StyledCard } from "./styles";

interface SettingCard {
  /**
   * Card title
   */
  title: string;
  /**
   * Card description
   */
  description: string;
  /**
   * Card footer text
   */
  text?: string;
  /**
   * Card onClick callback
   */
  onClick: () => void;
  /**
   * Card button text
   */
  button: string;
  /**
   * Card body content, input, table or other elements
   */
  children: React.ReactElement;
  /**
   * Card button disable state
   */
  isDisabled?: boolean;
  /**
   * Changes card styles based on variant
   */
  variant?: "default" | "danger";
}

const SettingCard = ({
  title,
  description,
  text,
  onClick,
  button,
  children,
  isDisabled,
  variant = "default",
}: SettingCard) => {
  const theme = useTheme();

  return (
    <StyledCard variant={variant}>
      <Container>
        <Text mb={theme.spacing.s1} data-testid="setting-title" size="large">
          {title}
        </Text>
        <Text mb={theme.spacing.s5} data-testid="setting-title" size="small">
          {description}
        </Text>
        {children}
      </Container>
      <HorizontalRule />
      <Footer>
        <Text
          muted
          mr={theme.spacing.s3}
          data-testid="setting-title"
          size="small"
        >
          {text}
        </Text>
        <Button
          variant={
            variant === "danger"
              ? ButtonVariant.DangerFilled
              : ButtonVariant.Secondary
          }
          ml="auto"
          onClick={onClick}
          isDisabled={isDisabled}
        >
          {button}
        </Button>
      </Footer>
    </StyledCard>
  );
};

export default memo(SettingCard);
