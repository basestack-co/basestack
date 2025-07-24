// Components
import { Input } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
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
  const { formId } = useParams<{ formId: string }>();
  const t = useTranslations("setting");
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
  });

  const inputName = watch("name");

  useEffect(() => {
    if (honeypot) {
      setValue("name", honeypot!);
    }
  }, [honeypot, setValue]);

  const onSave: SubmitHandler<FormInputs> = async (input) => {
    updateForm.mutate(
      {
        formId,
        honeypot: input.name,
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
                honeypot: result.form.honeypot,
              },
            );
          }

          toast.success(t("security.honeypot.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

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
