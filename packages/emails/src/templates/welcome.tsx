import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
  Font,
  Link,
  Img,
} from "@react-email/components";
import * as React from "react";
import * as Styles from "./styles";

interface ContentType {
  [key: string]: string | undefined | null;
}

interface WelcomeEmailTemplateProps {
  content: ContentType;
}

export const WelcomeEmailTemplate = ({
  content,
}: WelcomeEmailTemplateProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Welcome to Basestack Forms</Preview>
      <Body style={Styles.Main}>
        <Container style={Styles.Container}>
          <Img
            src="https://i.imgur.com/ZLau6wC.jpg"
            width="40"
            height="40"
            alt="basestack"
            style={{ marginBottom: "20px" }}
          />
          <Text style={Styles.Paragraph}>Hi {content.name},</Text>
          <Text style={{ ...Styles.Paragraph, margin: "20px 0" }}>
            Welcome to Basestack Forms, the platform that elevates your website
            with powerful, customizable forms.
          </Text>
          <Button
            style={Styles.PrimaryButton}
            href={`https://forms.basestack.co`}
          >
            Get Started
          </Button>
          <Text style={{ ...Styles.Paragraph, marginTop: "20px" }}>
            Basestack Team
          </Text>
          <Hr style={{ ...Styles.Hr, margin: "20px 0" }} />
          <Link
            href="https://github.com/basestack-co/basestack/discussions"
            style={{ ...Styles.Link, fontSize: "14px", marginBottom: "5px" }}
          >
            Help & Support
          </Link>
          <Text style={{ ...Styles.ParagraphMuted, fontSize: "14px" }}>
            © Basestack 2024
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

WelcomeEmailTemplate.PreviewProps = {
  content: {
    name: "Dexter",
  },
} as WelcomeEmailTemplateProps;

export default WelcomeEmailTemplate;