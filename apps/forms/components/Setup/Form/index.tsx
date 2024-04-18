import React from "react";
import { useTheme } from "styled-components";
import {
  Text,
  Card,
  InputGroup,
  Button,
  ButtonVariant,
} from "@basestack/design-system";

const Form = () => {
  const theme = useTheme();

  return (
    <Card p={theme.spacing.s5}>
      <Text size="large">Create form for demo</Text>
      <Text size="small" muted mb={theme.spacing.s5}>
        Follow our step by step examples to build and collect form submissions
        from your front-end code
      </Text>

      <form action="">
        <InputGroup
          title="Full Name"
          inputProps={{
            name: "name",
            placeholder: "Your first and last name",
            value: "",
            onChange: () => null,
          }}
          mb={theme.spacing.s4}
        />

        <InputGroup
          title="Your Email Address"
          inputProps={{
            name: "email",
            placeholder: "john@doe.com",
            value: "",
            onChange: () => null,
          }}
          mb={theme.spacing.s4}
        />

        <InputGroup
          title="Your message"
          textarea
          textareaProps={{
            name: "message",
            placeholder: "Enter your message...",
            value: "",
            onChange: () => null,
          }}
          mb={theme.spacing.s4}
        />

        <Button
          type="submit"
          fullWidth
          justifyContent="center"
          variant={ButtonVariant.Primary}
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default Form;
