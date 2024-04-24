import React from "react";
import { useTheme } from "styled-components";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Text, Card, HorizontalRule } from "@basestack/design-system";
import { rem } from "polished";
import { Link, List, ListItem } from "./styles";

interface ItemProps {
  text: string;
  href: string;
}

const Item = ({ text, href }: ItemProps) => (
  <ListItem>
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Text size="small" muted lineHeight={rem("24px")}>
        {text}
      </Text>
    </Link>
  </ListItem>
);
const Links = () => {
  const theme = useTheme();
  const { t } = useTranslation("forms");

  return (
    <Card mt={theme.spacing.s5} p={theme.spacing.s5}>
      <Text size="large">{t("setup.card.support.title")}</Text>
      <Text size="small" muted>
        {t("setup.card.support.description")}
      </Text>
      <HorizontalRule my={theme.spacing.s5} />
      <List>
        <Item text="File Upload" href="" />
        <Item text="Dropzone File Upload" href="" />
        <Item text="Disable Button on Submit" href="" />
        <Item text="Google ReCaptcha" href="" />
        <Item text="Trunstile" href="" />
        <Item text="Reset Fields" href="" />
        <Item text="Loading Button" href="" />
        <Item text="Signature" href="" />
        <Item text="Toast" href="" />
        <Item text="Basic Demo" href="" />
        <Item text="Form Validation" href="" />
        <Item text="Basic File Upload" href="" />
      </List>
    </Card>
  );
};

export default Links;
