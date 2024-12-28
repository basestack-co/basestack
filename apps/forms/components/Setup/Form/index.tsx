import React from "react";
import { useTheme } from "styled-components";
// Locales
import { useTranslations } from "next-intl";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Components
import {
  Text,
  Card,
  InputGroup,
  Button,
  ButtonVariant,
} from "@basestack/design-system";
// Utils
import { getBrowserUrl } from "@basestack/utils";
// Toast
import { toast } from "sonner";

export const FormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z.string().email(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  formId: string;
  isFormDisabled?: boolean;
}

const Form = ({ formId, isFormDisabled }: Props) => {
  const theme = useTheme();
  const t = useTranslations("form");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const isDisabled = isSubmitting || isFormDisabled;

  const onSave: SubmitHandler<FormInputs> = async (inputs) => {
    try {
      const res = await fetch(
        `${getBrowserUrl()}/api/v1/s/${formId}?mode=rest`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        },
      );

      const data = await res.json();

      if (data.code === 200) {
        toast.success(t("setup.card.form.toast.success"));
        reset();
      }

      if (data.error) {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.message ? error?.message : error);
    }
  };

  return (
    <Card p={theme.spacing.s5}>
      <Text size="large"> {t("setup.card.form.title")}</Text>
      <Text size="small" muted mb={theme.spacing.s5}>
        {t("setup.card.form.description")}
      </Text>

      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            title={t("setup.card.form.inputs.name.title")}
            hint={t(errors.name?.message!)}
            mb={theme.spacing.s4}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t("setup.card.form.inputs.name.placeholder"),
              hasError: !!errors.name,
              isDisabled,
            }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            title={t("setup.card.form.inputs.email.title")}
            hint={t(errors.email?.message!)}
            mb={theme.spacing.s4}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t("setup.card.form.inputs.email.placeholder"),
              hasError: !!errors.email,
              isDisabled,
            }}
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            title={t("setup.card.form.inputs.message.title")}
            hint={t(errors.message?.message!)}
            mb={theme.spacing.s4}
            textarea
            textareaProps={{
              name: field.name,
              value: field.value as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t("setup.card.form.inputs.message.placeholder"),
              hasError: !!errors.message,
              isDisabled,
            }}
          />
        )}
      />

      <Button
        fullWidth
        justifyContent="center"
        variant={ButtonVariant.Primary}
        isDisabled={isDisabled}
        isLoading={isSubmitting}
        onClick={handleSubmit(onSave)}
      >
        {t("setup.card.form.submit")}
      </Button>
    </Card>
  );
};

export default Form;
