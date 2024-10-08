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
import { InputGroup } from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Utils
import { PlanTypeId } from "@basestack/utils";
import { getWithPlanCardProps } from "./utils";
// Locales
import useTranslation from "next-translate/useTranslation";

export const FormSchema = z.object({
  url: z.string().url().optional().or(z.literal("")),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  successUrl?: string;
  planId: PlanTypeId;
}

const FormSuccessUrlCard = ({ successUrl = "", planId }: Props) => {
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
    defaultValues: {
      url: "",
    },
  });

  const watchUrl = watch("url");

  useEffect(() => {
    setValue("url", successUrl);
  }, [successUrl, setValue]);

  const onSave: SubmitHandler<FormInputs> = async (input) => {
    updateForm.mutate(
      {
        formId,
        successUrl: input.url,
        feature: "hasCustomUrls",
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
                successUrl: result.form.successUrl,
              },
            );
          }

          toast.success(t("customization.success-url.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <SettingCard
      title={t("customization.success-url.title")}
      description={t("customization.success-url.description")}
      {...getWithPlanCardProps({
        t,
        router,
        planId,
        feature: "hasCustomUrls",
        i18nKey: "customization.success-url.action",
        onClick: handleSubmit(onSave),
        isLoading: isSubmitting,
        isDisabled: isSubmitting || watchUrl === successUrl || !!errors.url,
        partial: false,
      })}
    >
      <Controller
        name="url"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            hint={t(errors.url?.message!)}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t(
                "customization.success-url.inputs.name.placeholder",
              ),
              hasError: !!errors.url,
              maxWidth: 560,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />
    </SettingCard>
  );
};

export default FormSuccessUrlCard;
