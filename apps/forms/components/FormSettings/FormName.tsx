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
    .max(30, "general.form.inputs.name.error.max")
    .min(1, "general.form.inputs.name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  role?: Role;
  name?: string;
}

const FormNameCard = ({ role, name }: Props) => {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();
  const updateForm = trpc.form.update.useMutation();
  const { formId } = router.query as { formId: string };
  const isAdmin = role === Role.ADMIN;

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

  const onSaveFormName: SubmitHandler<FormInputs> = async (input) => {
    updateForm.mutate(
      {
        formId,
        name: input.name,
      },
      {
        onSuccess: (result) => {
          // Get all the forms on the cache
          const cache = trpcUtils.form.all.getData();

          if (cache && cache.forms) {
            // Update the cache with the new data
            // This updates in the navigation list
            trpcUtils.form.all.setData(undefined, {
              forms: cache.forms.map((form) =>
                form.id === result.form.id
                  ? { ...form, name: result.form.name }
                  : form,
              ),
            });
          }

          const cacheForm = trpcUtils.form.byId.getData({
            formId: result.form.id,
          });

          if (cacheForm) {
            // Updates the current active form in the cache
            trpcUtils.form.byId.setData(
              { formId: result.form.id },
              {
                ...cacheForm,
                name: result.form.name,
              },
            );
          }

          toast.success(t("general.form.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  useEffect(() => {
    if (name) {
      setValue("name", name!);
    }
  }, [name, setValue]);

  return (
    <SettingCard
      title={t("general.form.title")}
      description={t("general.form.description")}
      button={t("general.form.action")!}
      onClick={handleSubmit(onSaveFormName)}
      isDisabled={isSubmitting || name === inputName || !!errors.name}
      isLoading={isSubmitting}
      hasFooter={isAdmin}
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
            placeholder={t("general.form.inputs.name.placeholder")}
            name={field.name}
            value={field.value}
            hasError={!!errors.name}
            isDisabled={isSubmitting || !name || !isAdmin}
          />
        )}
      />
    </SettingCard>
  );
};

export default FormNameCard;
