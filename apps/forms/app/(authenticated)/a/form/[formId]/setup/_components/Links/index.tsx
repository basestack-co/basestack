// Components
import { Card, HorizontalRule, Text } from "@basestack/design-system";
// Locales
import { NamespaceKeys, useTranslations } from "next-intl";
import { rem } from "polished";
import React from "react";
import { useTheme } from "styled-components";
import { Link, List, ListItem } from "./styles";
// Utils
import { links } from "./utils";

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
  const t = useTranslations("form");

  return (
    <Card mt={theme.spacing.s5} p={theme.spacing.s5}>
      <Text size="large">{t("setup.card.support.title")}</Text>
      <Text size="small" muted>
        {t("setup.card.support.description")}
      </Text>
      <HorizontalRule my={theme.spacing.s5} />
      <List>
        {links.map(({ i18nKey, href }, index) => (
          <Item
            key={`list-item-link-${index}`}
            text={t(i18nKey as NamespaceKeys<string, "form">)}
            href={href}
          />
        ))}
      </List>
    </Card>
  );
};

export default Links;
