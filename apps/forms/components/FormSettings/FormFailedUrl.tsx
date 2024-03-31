import React from "react";
// Router
import { useRouter } from "next/router";
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
// Locales
import useTranslation from "next-translate/useTranslation";

export const FormSchema = z.object({
  name: z.string().min(1, "customization.failed-url.inputs.name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const FormFailedUrlCard = () => {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();

  const { formId } = router.query as { formId: string };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const onSaveFormName: SubmitHandler<FormInputs> = async (input) => {};

  return (
    <SettingCard
      title={t("customization.failed-url.title")}
      description={t("customization.failed-url.description")}
      button={t("customization.failed-url.action")!}
      onClick={handleSubmit(onSaveFormName)}
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
            placeholder={t("customization.failed-url.inputs.name.placeholder")}
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

export default FormFailedUrlCard;
