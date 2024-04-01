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
  emails: z.string(),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  emails?: string;
}

const FormEmailsCard = ({ emails = "" }: Props) => {
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

  const watchIps = watch("emails");

  useEffect(() => {
    if (emails) {
      setValue("emails", emails);
    }
  }, [emails, setValue]);

  const onSave: SubmitHandler<FormInputs> = async (input) => {
    updateForm.mutate(
      {
        formId,
        emails: input.emails,
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
                emails: result.form.emails,
              },
            );
          }
        },
      },
    );
  };

  return (
    <SettingCard
      title={t("notifications.emails.title")}
      description={t("notifications.emails.description")}
      button={t("notifications.emails.action")!}
      onClick={handleSubmit(onSave)}
      isDisabled={isSubmitting || watchIps === emails}
      isLoading={isSubmitting}
      text={t("notifications.emails.text")}
      hasFooter
    >
      <Controller
        name="emails"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            maxWidth={400}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={t("notifications.emails.inputs.name.placeholder")}
            name={field.name}
            value={field.value}
            hasError={!!errors.emails}
            isDisabled={isSubmitting}
          />
        )}
      />
    </SettingCard>
  );
};

export default FormEmailsCard;
