import React from "react";
import { rem } from "polished";
import { useTheme } from "styled-components";
import { Text, Input, IconButton } from "@basestack/design-system";
import { Container, InputContainer, TextContainer } from "./styles";

const EndpointCard = () => {
  const theme = useTheme();

  return (
    <Container>
      <TextContainer>
        <Text mb={theme.spacing.s1} size="large">
          Your Form Endpoint
        </Text>
        <Text size="small" muted>
          This is the unique API URL for your form, you will be sending your
          form data to this URL.
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
