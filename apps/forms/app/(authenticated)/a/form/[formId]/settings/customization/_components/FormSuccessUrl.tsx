import React, { useEffect } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { api } from "utils/trpc/react";
// UI
import { SettingCard } from "@basestack/ui";
// Components
import { InputGroup } from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Utils
import { PlanTypeId } from "@basestack/utils";
import { getWithPlanCardProps } from "../../utils";
// Locales
import { useTranslations } from "next-intl";

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
  const { formId } = useParams<{ formId: string }>();
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const updateForm = api.forms.update.useMutation();

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
          const cache = trpcUtils.forms.byId.getData({
            formId: result.form.id,
          });

          if (cache) {
            trpcUtils.forms.byId.setData(
              { formId: result.form.id },
              {
                ...cache,
                successUrl: result.form.successUrl,
              },
            );
          }

          toast.success(t("setting.customization.success-url.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <SettingCard
      title={t("setting.customization.success-url.title")}
      description={t("setting.customization.success-url.description")}
      {...getWithPlanCardProps({
        router,
        planId,
        feature: "hasCustomUrls",
        onClick: handleSubmit(onSave),
        isLoading: isSubmitting,
        isDisabled: isSubmitting || watchUrl === successUrl || !!errors.url,
        partial: false,
        labels: {
          partial: t("common.plan.forms.upgrade.partial"),
          all: t("common.plan.forms.upgrade.all"),
          upgrade: t("common.plan.forms.upgrade.action"),
          save: t("setting.customization.success-url.action"),
          text: "",
        },
      })}
    >
      <Controller
        name="url"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            hint={errors.url?.message}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t(
                "setting.customization.success-url.inputs.name.placeholder",
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
