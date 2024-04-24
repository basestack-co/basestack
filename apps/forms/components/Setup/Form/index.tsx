import React from "react";
import { useTheme } from "styled-components";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import {
  Text,
  Card,
  InputGroup,
  Button,
  ButtonVariant,
} from "@basestack/design-system";

const Form = () => {
  const theme = useTheme();
  const { t } = useTranslation("forms");

  return (
    <Card p={theme.spacing.s5}>
      <Text size="large"> {t("setup.card.form.title")}</Text>
      <Text size="small" muted mb={theme.spacing.s5}>
        {t("setup.card.form.description")}
      </Text>

      <form action="">
        <InputGroup
          title={t("setup.card.form.inputs.name.title")}
          inputProps={{
            name: "name",
            placeholder: t("setup.card.form.inputs.name.placeholder"),
            value: "",
            onChange: () => null,
          }}
          mb={theme.spacing.s4}
        />

        <InputGroup
          title={t("setup.card.form.inputs.email.title")}
          inputProps={{
            name: "email",
            placeholder: t("setup.card.form.inputs.email.placeholder"),
            value: "",
            onChange: () => null,
          }}
          mb={theme.spacing.s4}
        />

        <InputGroup
          title={t("setup.card.form.inputs.message.title")}
          textarea
          textareaProps={{
            name: "message",
            placeholder: t("setup.card.form.inputs.message.placeholder"),
            value: "",
            onChange: () => null,
          }}
          mb={theme.spacing.s4}
        />

        <Button
          type="submit"
          fullWidth
          justifyContent="center"
          variant={ButtonVariant.Primary}
        >
          {t("setup.card.form.submit")}
        </Button>
      </form>
    </Card>
  );
};

export default Form;
