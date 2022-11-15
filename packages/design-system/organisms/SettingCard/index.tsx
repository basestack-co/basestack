import React, { memo } from "react";
import { useTheme } from "styled-components";
import { Button, ButtonVariant, Card, HorizontalRule, Text } from "../../atoms";
import { Container, Footer } from "./styles";

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
}

const SettingCard = ({
  title,
  description,
  text,
  onClick,
  button,
  children,
  isDisabled,
}: SettingCard) => {
  const theme = useTheme();

  return (
    <Card>
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
          variant={ButtonVariant.Secondary}
          ml="auto"
          onClick={onClick}
          isDisabled={isDisabled}
        >
          {button}
        </Button>
      </Footer>
    </Card>
  );
};

export default memo(SettingCard);
