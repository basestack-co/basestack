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
// Toast
import { toast } from "sonner";
// Locales
import useTranslation from "next-translate/useTranslation";

export const FormSchema = z.object({
  url: z.string(),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  errorUrl?: string;
}

const FormFailedUrlCard = ({ errorUrl = "" }: Props) => {
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
    setValue("url", errorUrl);
  }, [errorUrl, setValue]);

  const onSave: SubmitHandler<FormInputs> = async (input) => {
    updateForm.mutate(
      {
        formId,
        errorUrl: input.url,
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
                errorUrl: result.form.errorUrl,
              },
            );
          }

          toast.success(t("customization.failed-url.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <SettingCard
      title={t("customization.failed-url.title")}
      description={t("customization.failed-url.description")}
      button={t("customization.failed-url.action")!}
      onClick={handleSubmit(onSave)}
      isDisabled={isSubmitting || watchUrl === errorUrl}
      isLoading={isSubmitting}
      hasFooter
    >
      <Controller
        name="url"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            maxWidth={560}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={t("customization.failed-url.inputs.name.placeholder")}
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

export default FormFailedUrlCard;
