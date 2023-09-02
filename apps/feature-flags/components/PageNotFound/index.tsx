import React from "react";
import { rem } from "polished";
import { useTheme } from "styled-components";
// Router
import { useRouter } from "next/router";
// UI
import { Text, Label, Button, ButtonVariant } from "@basestack/design-system";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Container, ContentContainer } from "./styles";

const PageNotFound = () => {
  const { t } = useTranslation("general");
  const router = useRouter();
  const theme = useTheme();

  return (
    <Container>
      <ContentContainer>
        <Label text="404 error" variant="info" size="medium" isTranslucent />
        <Text
          size="xxLarge"
          fontSize={rem("28px")}
          lineHeight="1.4"
          fontFamily="robotoFlex"
          color={theme.colors.black}
          mt={theme.spacing.s3}
          mb={theme.spacing.s1}
          fontWeight={800}
        >
          {t("not-found.title")}
        </Text>
        <Text size="medium" fontWeight={400} lineHeight="1.6" muted>
          {t("not-found.description")}
        </Text>
        <Button
          onClick={() => router.push("/")}
          iconPlacement="left"
          icon="arrow_back"
          variant={ButtonVariant.Outlined}
          mt={theme.spacing.s6}
        >
          {t("not-found.action")}
        </Button>
      </ContentContainer>
    </Container>
  );
};

export default PageNotFound;
