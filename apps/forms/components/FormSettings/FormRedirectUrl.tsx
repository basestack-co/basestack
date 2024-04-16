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
import { Input, CardVariant } from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Locales
import useTranslation from "next-translate/useTranslation";

export const FormSchema = z.object({
  url: z.string(),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  redirectUrl?: string;
}

const FormRedirectUrlCard = ({ redirectUrl = "" }: Props) => {
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
          const cache = trpcUtils.form.byId.getData({
            formId: result.form.id,
          });

          if (cache) {
            trpcUtils.form.byId.setData(
              { formId: result.form.id },
              {
                ...cache,
                redirectUrl: result.form.redirectUrl,
              },
            );
          }

          toast.success(t("customization.redirect-url.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const isBlocked = true;

  const cardProps = isBlocked
    ? {
        button: "Upgrade",
        onClick: () => null,
        hasOverlay: true,
        variant: CardVariant.PRIMARY,
        label: "Upgrade to Pro",
      }
    : {
        button: t("customization.redirect-url.title"),
        onClick: () => handleSubmit(onSave),
        isLoading: isSubmitting,
        isDisabled: isSubmitting || watchUrl === redirectUrl,
      };

  return (
    <SettingCard
      title={t("customization.redirect-url.title")}
      description={t("customization.redirect-url.description")}
      {...cardProps}
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
            placeholder={t(
              "customization.redirect-url.inputs.name.placeholder",
            )}
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

export default FormRedirectUrlCard;
