import React from "react";
// Components
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Button,
} from "@react-email/components";

interface Props {
  loginCode?: string;
}

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

export const EmailTemplate = ({ loginCode = "" }: Props) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link</Preview>
    <Body style={main}>
      <Container style={container}>
        <Button href="https://example.com" style={{ color: "#61dafb" }}>
          Click me
        </Button>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;
