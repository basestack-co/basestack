import React from "react";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { trpc } from "libs/trpc";
// UI
import { SettingCard } from "@basestack/ui";
// Components
import { Input } from "@basestack/design-system";
// Types
import { Role } from "@prisma/client";
// Locales
import useTranslation from "next-translate/useTranslation";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "general.form.inputs.name.error.max")
    .min(1, "general.form.inputs.name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const FormNameCard = () => {
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const onSaveProjectName: SubmitHandler<FormInputs> = async (input) => {};

  return (
    <SettingCard
      title={t("general.form.title")}
      description={t("general.form.description")}
      button={t("general.form.action")!}
      onClick={handleSubmit(onSaveProjectName)}
      isDisabled={isSubmitting}
      isLoading={isSubmitting}
      hasFooter
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            maxWidth={400}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={t("general.form.inputs.name.placeholder")}
            name={field.name}
            value={field.value}
            hasError={!!errors.name}
            isDisabled={isSubmitting}
          />
        )}
      />
    </SettingCard>
  );
};

export default FormNameCard;
