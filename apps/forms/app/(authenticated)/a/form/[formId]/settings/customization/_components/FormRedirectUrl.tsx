// Components
import { InputGroup } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import type { PlanTypeId } from "@basestack/utils";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { useEffect } from "react";
// Form
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
import { z } from "zod";
import { getWithPlanCardProps } from "../../utils";

export const FormSchema = z.object({
  url: z.string().url().optional().or(z.literal("")),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  redirectUrl?: string;
  planId: PlanTypeId;
}

const FormRedirectUrlCard = ({ redirectUrl = "", planId }: Props) => {
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
    setValue("url", redirectUrl);
  }, [redirectUrl, setValue]);

  const onSave: SubmitHandler<FormInputs> = async (input) => {
    updateForm.mutate(
      {
        formId,
        redirectUrl: input.url,
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
                redirectUrl: result.form.redirectUrl,
              },
            );
          }

          toast.success(t("setting.customization.redirect-url.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <SettingCard
      title={t("setting.customization.redirect-url.title")}
      description={t("setting.customization.redirect-url.description")}
      {...getWithPlanCardProps({
        router,
        planId,
        feature: "hasCustomUrls",
        onClick: handleSubmit(onSave),
        isLoading: isSubmitting,
        isDisabled: isSubmitting || watchUrl === redirectUrl || !!errors.url,
        partial: false,
        labels: {
          partial: t("common.plan.forms.upgrade.partial"),
          all: t("common.plan.forms.upgrade.all"),
          upgrade: t("common.plan.forms.upgrade.action"),
          save: t("setting.customization.redirect-url.action"),
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
                "setting.customization.redirect-url.inputs.name.placeholder",
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

export default FormRedirectUrlCard;
