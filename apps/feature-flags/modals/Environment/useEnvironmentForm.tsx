import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { InputGroup } from "@basestack/design-system";
// Form
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Locales
import useTranslation from "next-translate/useTranslation";
// Types
import { FormInputs, FormSchema } from "./types";

const useEnvironmentForm = (isCreate: boolean = false) => {
  const { t } = useTranslation("modals");
  const theme = useTheme();
  const [textareaLength, setTextareaLength] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const defaultFallbackHint = isCreate ? t("environment.input.name.hint") : "";

  const onChangeTextarea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;
      if (textareaLength.length < 250) {
        setTextareaLength(text);
      }

      setValue("description", text);
    },
    [textareaLength, setValue],
  );
  const onRenderForm = () => {
    return (
      <>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              title={t("environment.input.name.title")}
              hint={t(errors.name?.message!) ?? defaultFallbackHint}
              inputProps={{
                type: "text",
                name: field.name,
                value: field.value,
                onChange: field.onChange,
                onBlur: field.onBlur,
                placeholder: t("environment.input.name.placeholder"),
                hasError: !!errors.name,
                isDisabled: isSubmitting,
              }}
              mb={theme.spacing.s6}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              title={t("environment.input.description.title")}
              label={`${textareaLength.length} / 250`}
              textarea
              textareaProps={{
                name: field.name,
                value: field.value ?? "",
                onChange: onChangeTextarea,
                onBlur: field.onBlur,
                placeholder: t("environment.input.description.placeholder"),
                maxlength: "250",
                hasError: !!errors.description,
                isDisabled: isSubmitting,
              }}
            />
          )}
        />
      </>
    );
  };

  return { handleSubmit, onRenderForm, isSubmitting, reset, setValue } as const;
};

export default useEnvironmentForm;
