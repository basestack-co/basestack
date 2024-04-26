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
        <Item
          text={t("setup.card.support.link.business-contact-form")}
          href=""
        />
        <Item
          text={t("setup.card.support.link.email-subscription-form")}
          href=""
        />
        <Item text={t("setup.card.support.link.client-review-form")} href="" />
        <Item
          text={t("setup.card.support.link.patient-details-form")}
          href=""
        />
        <Item
          text={t("setup.card.support.link.job-application-form")}
          href=""
        />
        <Item text={t("setup.card.support.link.online-order-form")} href="" />
        <Item
          text={t("setup.card.support.link.delivery-feedback-form")}
          href=""
        />
        <Item text={t("setup.card.support.link.reunion-form")} href="" />
        <Item text={t("setup.card.support.link.school-application")} href="" />
        <Item
          text={t("setup.card.support.link.workshop-registration-form")}
          href=""
        />
        <Item
          text={t("setup.card.support.link.software-request-form")}
          href=""
        />
        <Item text={t("setup.card.support.link.product-review-form")} href="" />
      </List>
    </Card>
  );
};

export default Links;
