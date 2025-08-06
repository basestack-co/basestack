// Components
import { InputGroup } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams } from "next/navigation";
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

export const FormSchema = z.object({
  url: z.string().url().optional().or(z.literal("")),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  redirectUrl?: string;
}

const FormRedirectUrlCard = ({ redirectUrl = "" }: Props) => {
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
              }
            );
          }

          toast.success(t("setting.customization.redirect-url.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <SettingCard
      title={t("setting.customization.redirect-url.title")}
      description={t("setting.customization.redirect-url.description")}
      text={""}
      button={t("setting.customization.redirect-url.action")}
      onClick={handleSubmit(onSave)}
      isLoading={isSubmitting}
      isDisabled={isSubmitting || watchUrl === redirectUrl || !!errors.url}
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
                "setting.customization.redirect-url.inputs.name.placeholder"
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
