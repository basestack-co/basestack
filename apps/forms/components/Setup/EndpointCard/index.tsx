import React from "react";
import { rem } from "polished";
import { useTheme } from "styled-components";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Text, Input, IconButton } from "@basestack/design-system";
import { Container, InputContainer, TextContainer } from "./styles";

const EndpointCard = () => {
  const theme = useTheme();
  const { t } = useTranslation("forms");

  return (
    <Container>
      <TextContainer>
        <Text mb={theme.spacing.s1} size="large">
          {t("setup.card.endpoint.title")}
        </Text>
        <Text size="small" muted>
          {t("setup.card.endpoint.description")}
        </Text>
      </TextContainer>
      <InputContainer>
        <Input
          width="100%"
          placeholder=""
          name="url"
          onChange={() => null}
          value="https://basestack/s/23dre5"
          isDarker
        />
        <IconButton
          position="absolute"
          size="medium"
          variant="secondaryDark"
          right={rem("6px")}
          icon="content_copy"
          onClick={() => null}
        />
      </InputContainer>
    </Container>
  );
};

export default EndpointCard;
