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
// Types
import { Role } from "@prisma/client";
// Toast
import { toast } from "sonner";
// Locales
import useTranslation from "next-translate/useTranslation";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "security.honeypot.inputs.name.error.max")
    .min(1, "general.honeypot.inputs.name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  honeypot?: string;
}

const FormHoneyPotCard = ({ honeypot }: Props) => {
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

  const inputName = watch("name");

  const onSave: SubmitHandler<FormInputs> = async (input) => {
    updateForm.mutate(
      {
        formId,
        honeypot: input.name,
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

          toast.success(t("general.webhook-url.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  useEffect(() => {
    if (honeypot) {
      setValue("name", honeypot!);
    }
  }, [honeypot, setValue]);

  return (
    <SettingCard
      title={t("security.honeypot.title")}
      description={t("security.honeypot.description")}
      button={t("security.honeypot.action")!}
      onClick={handleSubmit(onSave)}
      isDisabled={isSubmitting || honeypot === inputName || !!errors.name}
      isLoading={isSubmitting}
      text={t("security.honeypot.text")}
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
            placeholder={t("security.honeypot.inputs.name.placeholder")}
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

export default FormHoneyPotCard;
