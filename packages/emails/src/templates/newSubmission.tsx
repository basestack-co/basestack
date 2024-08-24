import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NewSubmissionEmailTemplateProps {
  formName: string;
  content: string;
  formId: string;
}

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const submission = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#fff",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "#276ef1",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  paddingTop: "19px",
  paddingBottom: "19px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const helpLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};

export const NewSubmissionEmailTemplate = ({
  formName,
  content,
  formId,
}: NewSubmissionEmailTemplateProps) => {
  const title = `New submission received for ${formName}`;

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>{title}</Text>
              <Text style={submission}>{content}</Text>
              <Text style={paragraph}>
                Manage or learn more about the submission by visiting the
                dashboard.
              </Text>

              <Button
                style={button}
                href={`https://forms.basestack.co/form/${formId}/submissions`}
              >
                View submission
              </Button>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <Row>
              <Text style={footer}>© Basestack 2024</Text>
              <Link
                href="https://github.com/basestack-co/basestack/discussions"
                style={helpLink}
              >
                Help & Support
              </Link>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

NewSubmissionEmailTemplate.PreviewProps = {
  formName: "Form Name",
  content: "Form content",
  formId: "",
} as NewSubmissionEmailTemplateProps;

export default NewSubmissionEmailTemplate;
