import React from "react";
import { rem } from "polished";
import { useTheme } from "styled-components";
// UI
import { Text, Icon, ButtonVariant, Button } from "@basestack/design-system";
// Components
import { Container, ContentContainer, Footer } from "./styles";

export interface StatusPageProps {
  type: "success" | "error";
  title: string;
  description: string;
  button: {
    text: string;
    onClick: () => void;
  };
  brand: {
    text: string;
    onClick: () => void;
  };
}

const StatusPage = ({
  type,
  title,
  description,
  button,
  brand,
}: StatusPageProps) => {
  const theme = useTheme();

  return (
    <Container>
      <ContentContainer>
        <Icon
          icon={type === "success" ? "check_circle" : "error"}
          size="xxLarge"
          color={theme.colors[type === "success" ? "green300" : "red300"]}
        />
        <Text
          size="xxLarge"
          fontSize={rem("28px")}
          lineHeight="1.4"
          fontFamily="robotoFlex"
          mt={theme.spacing.s3}
          mb={theme.spacing.s1}
          fontWeight={800}
        >
          {title}
        </Text>
        <Text size="medium" fontWeight={400} lineHeight="1.6" muted>
          {description}
        </Text>
        <Button
          onClick={button.onClick}
          iconPlacement="left"
          icon="arrow_back"
          variant={ButtonVariant.Outlined}
          mt={theme.spacing.s6}
        >
          {button.text}
        </Button>
      </ContentContainer>
      <Footer>
        <Button
          onClick={brand.onClick}
          iconPlacement="left"
          icon="post"
          variant={ButtonVariant.Tertiary}
          mt={theme.spacing.s6}
          iconSize="small"
        >
          {brand.text}
        </Button>
      </Footer>
    </Container>
  );
};

export default StatusPage;
