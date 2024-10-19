export const Main = {
  backgroundColor: "#fff",
};

export const Container = {
  padding: "30px 15px",
};

export const Heading = {
  fontSize: "18px",
  lineHeight: 1.4,
  fontWeight: 700,
  color: "#000",
  margin: 0,
};

export const Paragraph = {
  fontSize: "16px",
  lineHeight: 1.6,
  fontWeight: 400,
  color: "#000",
  margin: 0,
};

export const ParagraphSecondary = {
  ...Paragraph,
  color: "#545454",
};

export const ParagraphMuted = {
  ...Paragraph,
  color: "#757575",
};

export const ParagraphMedium = {
  ...Paragraph,
  fontWeight: 500,
  color: "#000",
};

export const PrimaryButton = {
  backgroundColor: "#276EF1",
  borderRadius: "4px",
  color: "#fff",
  paddingTop: "12px",
  paddingBottom: "12px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  fontSize: "16px",
};

export const Link = {
  ...Paragraph,
  color: "#276EF1",
  display: "block",
};

export const Hr = {
  borderColor: "#E2E2E2",
  margin: 0,
};

export const Card = {
  padding: "20px",
  backgroundColor: "#F6F6F6",
  borderRadius: "4px",
};
