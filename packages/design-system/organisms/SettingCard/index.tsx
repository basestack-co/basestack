import React, { memo } from "react";
import { useTheme } from "styled-components";
import { Text, Card, HorizontalRule, Button, Input } from "../../atoms";
import { InputProps } from "../../atoms/Input";
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
   * Card input
   */
  input: InputProps;
}

const SettingCard = ({
  title,
  description,
  text,
  onClick,
  button,
  input,
}: SettingCard) => {
  const theme = useTheme();

  return (
    <Card>
      <Container>
        <Text mb={theme.spacing.s2} data-testid="setting-title" size="large">
          {title}
        </Text>
        <Text mb={theme.spacing.s5} data-testid="setting-title" size="small">
          {description}
        </Text>
        <Input maxWidth={400} {...input} />
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
        <Button variant="secondary" ml="auto" onClick={onClick}>
          {button}
        </Button>
      </Footer>
    </Card>
  );
};

export default memo(SettingCard);
