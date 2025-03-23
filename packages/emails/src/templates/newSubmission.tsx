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

interface NewSubmissionEmailTemplateProps {
  formName: string;
  content: ContentType;
  formId: string;
}

interface ListProps {
  data: ContentType;
}

const List: React.FC<ListProps> = ({ data }) => {
  if (!data) return null;

  const entries = Object.entries(data);
  const displayedEntries = entries.slice(0, 5); // Limit to 5 items
  const totalEntries = entries.length;

  return (
    <div style={Styles.Card}>
      {displayedEntries.map(([key, value]) => (
        <p style={{ ...Styles.Paragraph, marginBottom: "10px" }} key={key}>
          <b style={{ fontWeight: 500, marginRight: "6px" }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </b>
          {value}
        </p>
      ))}
      {totalEntries > 5 && (
        <p style={Styles.Paragraph}>
          <b style={{ fontWeight: 500 }}>+{totalEntries - 5} more items</b>
        </p>
      )}
    </div>
  );
};

export const NewSubmissionEmailTemplate = ({
  formName,
  content,
  formId,
}: NewSubmissionEmailTemplateProps) => {
  const title = `New Submission for ${formName}`;

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
          <Text style={Styles.Heading}>{title}</Text>
          <Text style={{ ...Styles.Paragraph, margin: "10px 0 20px 0" }}>
            View and manage the submission on your dashboard.
          </Text>
          <List data={content} />
          <Button
            style={{ ...Styles.PrimaryButton, marginTop: "20px" }}
            href={`https://forms.basestack.co/form/${formId}/submissions`}
          >
            View submission
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
            © Basestack {new Date().getFullYear()}. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

NewSubmissionEmailTemplate.PreviewProps = {
  formName: "Contacts",
  content: {
    name: "Kevin Doe",
    email: "example@example.com",
    message: "Hello, I am a message",
  },
  formId: "",
} as NewSubmissionEmailTemplateProps;

export default NewSubmissionEmailTemplate;
