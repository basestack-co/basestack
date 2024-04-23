import React from "react";
import { useTheme } from "styled-components";
import { Text, Card, HorizontalRule } from "@basestack/design-system";
import { rem } from "polished";
import { Link, List, ListItem } from "./styles";

const Item = ({ text = "" }) => (
  <ListItem>
    <Link href="" target="_blank" rel="noopener noreferrer">
      <Text size="small" muted lineHeight={rem("24px")}>
        {text}
      </Text>
    </Link>
  </ListItem>
);
const Links = () => {
  const theme = useTheme();

  return (
    <Card mt={theme.spacing.s5} p={theme.spacing.s5}>
      <Text size="large">Create form for demo</Text>
      <Text size="small" muted>
        Follow our step by step examples to build and collect form submissions
        from your front-end code
      </Text>
      <HorizontalRule my={theme.spacing.s5} />
      <List>
        <Item text="File Upload" />
        <Item text="Dropzone File Upload" />
        <Item text="Disable Button on Submit" />
        <Item text="Google ReCaptcha" />
        <Item text="Trunstile" />
        <Item text="Reset Fields" />
        <Item text="Loading Button" />
        <Item text="Signature" />
        <Item text="Toast" />
        <Item text="Basic Demo" />
        <Item text="Form Validation" />
        <Item text="Basic File Upload" />
      </List>
    </Card>
  );
};

export default Links;
