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

interface AddProjectMemberEmailTemplateProps {
  product: string;
  fromUserName: string;
  toUserName: string;
  project: string;
  linkText: string;
  linkUrl: string;
}

export const AddProjectMemberEmailTemplate = ({
  product,
  fromUserName,
  toUserName,
  project,
  linkText,
  linkUrl,
}: AddProjectMemberEmailTemplateProps) => {
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
            <b style={Styles.ParagraphMedium}>{fromUserName}</b> has added you
            to the <b style={Styles.ParagraphMedium}>{project}</b> project on{" "}
            <b style={Styles.ParagraphMedium}>{product}</b>.
          </Text>
          <Button
            style={{ ...Styles.PrimaryButton, margin: "20px 0" }}
            href={linkUrl}
          >
            {linkText}
          </Button>
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

AddProjectMemberEmailTemplate.PreviewProps = {
  product: "Basestack",
  fromUserName: "Ellen",
  toUserName: "Ellen",
  project: "Evermore",
  linkText: "Open Project",
  linkUrl: "https://github.com/basestack-co",
} as AddProjectMemberEmailTemplateProps;

export default AddProjectMemberEmailTemplate;
