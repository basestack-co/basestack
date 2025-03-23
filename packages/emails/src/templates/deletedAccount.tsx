import {
  Body,
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
import { Paragraph } from "./styles";

interface ContentType {
  [key: string]: string | undefined | null;
}

interface DeletedAccountEmailTemplateProps {
  content: ContentType;
}

export const DeletedAccountEmailTemplate = ({
  content,
}: DeletedAccountEmailTemplateProps) => {
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
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="bold"
        />
      </Head>
      <Preview>Confirmation of Account Deletion</Preview>
      <Body style={Styles.Main}>
        <Container style={Styles.Container}>
          <Img
            src="https://i.imgur.com/ZLau6wC.jpg"
            width="40"
            height="40"
            alt="basestack"
            style={{ marginBottom: "20px" }}
          />
          <Text style={Styles.Heading}>Confirmation of Account Deletion</Text>
          <Text style={textStyles}>Hi {content.name},</Text>
          <Text style={textStyles}>
            We wanted to confirm that your account with us has been successfully
            deleted, as per your request. We&apos;re sorry to see you go, but we
            hope to welcome you back in the future.
          </Text>
          <Text style={textStyles}>
            If there’s anything we can do to improve your experience, or if you
            decide to rejoin us, don’t hesitate to reach out. We’re always here
            to help.
          </Text>
          <Text style={textStyles}>
            Thank you for being part of our community, and we hope to see you
            again soon!
          </Text>
          <Text style={textStyles}>Basestack Team</Text>
          <Hr style={{ ...Styles.Hr, margin: "20px 0" }} />
          <Link
            href="https://github.com/basestack-co/basestack/discussions"
            style={{ ...Styles.Link, fontSize: "14px", marginBottom: "5px" }}
          >
            Help & Support
          </Link>
          <Text style={{ ...Styles.ParagraphMuted, fontSize: "14px" }}>
            © Basestack {new Date().getFullYear()}. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

DeletedAccountEmailTemplate.PreviewProps = {
  content: {
    name: "Dexter",
  },
} as DeletedAccountEmailTemplateProps;

export const textStyles = {
  ...Paragraph,
  marginTop: "20px",
};

export default DeletedAccountEmailTemplate;
