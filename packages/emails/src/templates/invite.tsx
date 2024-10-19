import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";
import * as Styles from "./styles";

interface ContentType {
  [key: string]: string | undefined | null;
}

interface InviteEmailTemplateProps {
  userName: string;
  content: ContentType;
  formId: string;
}

export const InviteEmailTemplate = ({
  userName,
  content,
  formId,
}: InviteEmailTemplateProps) => {
  const title = `New Invite from @${userName}`;

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
          fontWeight={500}
          fontStyle="medium"
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
      <Preview>{title}</Preview>
      <Body style={Styles.Main}>
        <Container style={Styles.Container}>
          <Img
            src="https://images.pexels.com/photos/3370333/pexels-photo-3370333.jpeg?auto=compress&cs=tinysrgb&w=800"
            width="40"
            height="40"
            alt="basestack"
            style={{ marginBottom: "20px" }}
          />
          <Text style={{ ...Styles.Heading, marginBottom: "20px" }}>
            Join <b>{content.project}</b> on <b>Basestack</b>
          </Text>

          <Text style={{ ...Styles.Paragraph, marginBottom: "10px" }}>
            Hello {userName},
          </Text>
          <Text style={Styles.ParagraphSecondary}>
            <b style={Styles.ParagraphMedium}>{content.name}</b> has invited you
            to the <b style={Styles.ParagraphMedium}>{content.project}</b> team
            on <b style={Styles.ParagraphMedium}>Basestack</b>.
          </Text>
          <Button
            style={{ ...Styles.PrimaryButton, margin: "20px 0" }}
            href={`https://forms.basestack.co/form/${formId}/submissions`}
          >
            {content.button}
          </Button>
          <div style={Styles.Card}>
            <Text style={{ ...Styles.Paragraph, marginBottom: "2px" }}>
              or copy and paste this URL into your browser:
            </Text>
            <Link href="https://github.com/basestack-co" style={Styles.Link}>
              https://github.com/basestack-co
            </Link>
          </div>

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
            © Basestack 2024, Portugal Azores São Miguel
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

InviteEmailTemplate.PreviewProps = {
  userName: "Ellen",
  content: {
    name: "Dexter",
    email: "dexter@example.com",
    project: "Evermore",
    button: "Join The Team",
  },
  formId: "",
} as InviteEmailTemplateProps;

export default InviteEmailTemplate;
