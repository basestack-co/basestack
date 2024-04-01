import React, { useEffect } from "react";
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
  url: z.string(),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  webhookUrl?: string;
}

const FormWebHookUrlCard = ({ webhookUrl = "" }: Props) => {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();
  const updateForm = trpc.form.update.useMutation();

  const { formId } = router.query as { formId: string };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const watchUrl = watch("url");

  useEffect(() => {
    if (webhookUrl) {
      setValue("url", webhookUrl);
    }
  }, [webhookUrl, setValue]);

  const onSave: SubmitHandler<FormInputs> = async (input) => {
    updateForm.mutate(
      {
        formId,
        webhookUrl: input.url,
      },
      {
        onSuccess: (result) => {
          const cache = trpcUtils.form.byId.getData({
            formId: result.form.id,
          });

          if (cache) {
            trpcUtils.form.byId.setData(
              { formId: result.form.id },
              {
                ...cache,
                webhookUrl: result.form.webhookUrl,
              },
            );
          }
        },
      },
    );
  };

  return (
    <SettingCard
      title={t("general.webhook-url.title")}
      description={t("general.webhook-url.description")}
      button={t("general.webhook-url.action")!}
      onClick={handleSubmit(onSave)}
      isDisabled={isSubmitting || watchUrl === webhookUrl}
      isLoading={isSubmitting}
      hasFooter
    >
      <Controller
        name="url"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            maxWidth={400}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={t("general.webhook-url.inputs.name.placeholder")}
            name={field.name}
            value={field.value}
            hasError={!!errors.url}
            isDisabled={isSubmitting}
          />
        )}
      />
    </SettingCard>
  );
};

export default FormWebHookUrlCard;
