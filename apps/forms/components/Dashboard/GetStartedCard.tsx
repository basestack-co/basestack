import React from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { useTheme } from "styled-components";
import {
  Text,
  Button,
  Card,
  ButtonVariant,
  IconBox,
} from "@basestack/design-system";

const GetStartedCard = () => {
  const { t } = useTranslation("home");
  const theme = useTheme();

  return (
    <Card hasHoverAnimation p={theme.spacing.s5}>
      <IconBox icon="downloading" mb={theme.spacing.s5} />
      <Text size="large" mb={theme.spacing.s2}>
        {t("links.sdks.title")}
      </Text>
      <Text muted size="small" mb={theme.spacing.s6}>
        {t("links.sdks.description")}
      </Text>
      <Button mt="auto" variant={ButtonVariant.Outlined} onClick={() => null}>
        {t("links.sdks.action")}
      </Button>
    </Card>
  );
};

export default GetStartedCard;
