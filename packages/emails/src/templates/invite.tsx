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
import * as Styles from "./styles";

interface InviteEmailTemplateProps {
  product: string;
  fromUserName: string;
  toUserName: string;
  team: string;
  linkText: string;
  linkUrl: string;
}

export const InviteEmailTemplate = ({
  product,
  fromUserName,
  toUserName,
  team,
  linkText,
  linkUrl,
}: InviteEmailTemplateProps) => {
  const title = `New Invite from @${fromUserName}`;

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
            src="https://i.imgur.com/ZLau6wC.jpg"
            width="40"
            height="40"
            alt="basestack"
            style={{ marginBottom: "20px" }}
          />
          <Text style={{ ...Styles.Paragraph, marginBottom: "20px" }}>
            Hello {toUserName},
          </Text>
          <Text style={Styles.ParagraphSecondary}>
            <b style={Styles.ParagraphMedium}>{fromUserName}</b> has invited you
            to the <b style={Styles.ParagraphMedium}>{team}</b> team on{" "}
            <b style={Styles.ParagraphMedium}>{product}</b>.
          </Text>
          <Button
            style={{ ...Styles.PrimaryButton, margin: "20px 0" }}
            href={linkUrl}
          >
            {linkText}
          </Button>
          <div style={Styles.Card}>
            <Text style={{ ...Styles.Paragraph, marginBottom: "2px" }}>
              or copy and paste this URL into your browser:
            </Text>
            <Link href={linkUrl} style={Styles.Link}>
              {linkUrl}
            </Link>
          </div>
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

InviteEmailTemplate.PreviewProps = {
  product: "Basestack",
  fromUserName: "Ellen",
  toUserName: "Ellen",
  team: "Evermore",
  linkText: "Join The Team",
  linkUrl: "https://github.com/basestack-co",
} as InviteEmailTemplateProps;

export default InviteEmailTemplate;
