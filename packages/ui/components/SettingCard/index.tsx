import React, { memo } from "react";
import { useTheme } from "styled-components";
import {
  Button,
  ButtonVariant,
  HorizontalRule,
  Text,
  Label,
  Card,
  CardVariant,
} from "@basestack/design-system";
import {
  Container,
  Footer,
  Header,
  Overlay,
  TagContainer,
  TextContainer,
} from "./styles";
import { SettingCardProps } from "./types";

const SettingCard = ({
  title,
  description,
  text,
  onClick,
  button,
  children,
  isDisabled,
  variant = CardVariant.DEFAULT,
  isLoading = false,
  hasFooter = true,
  hasOverlay = false,
  label,
}: SettingCardProps) => {
  const theme = useTheme();

  const buttonVariant: { [key: string]: ButtonVariant } = {
    [CardVariant.DEFAULT]: ButtonVariant.Secondary,
    [CardVariant.DANGER]: ButtonVariant.DangerFilled,
    [CardVariant.PRIMARY]: ButtonVariant.Primary,
  };

  return (
    <Card variant={variant}>
      <Container>
        {hasOverlay && <Overlay />}
        <Header>
          <TextContainer>
            <Text
              mb={theme.spacing.s1}
              data-testid="setting-title"
              size="large"
            >
              {title}
            </Text>
            <Text data-testid="setting-title" size="small">
              {description}
            </Text>
          </TextContainer>

          {!!label && (
            <TagContainer>
              <Label text={label} variant="info" isTranslucent />
            </TagContainer>
          )}
        </Header>
        {children}
      </Container>
      {hasFooter && (
        <>
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
              variant={buttonVariant[variant]}
              ml="auto"
              onClick={onClick}
              isDisabled={isDisabled}
              isLoading={isLoading}
            >
              {button}
            </Button>
          </Footer>
        </>
      )}
    </Card>
  );
};

export { type SettingCardProps };

export default memo(SettingCard);
