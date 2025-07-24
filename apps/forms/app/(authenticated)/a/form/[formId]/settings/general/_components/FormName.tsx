// Types
import { Role } from ".prisma/client";
// Components
import { InputGroup } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import { isEmptyObject } from "@basestack/utils";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
// Form
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
import { z } from "zod";

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
  const { formId } = useParams<{ formId: string }>();
  const t = useTranslations("setting");
  const trpcUtils = api.useUtils();
  const updateForm = api.forms.update.useMutation();
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
          const cache = trpcUtils.forms.list.getData();

          if (cache && cache.forms) {
            // Update the cache with the new data
            // This updates in the navigation list
            trpcUtils.forms.list.setData(undefined, {
              forms: cache.forms.map((form) =>
                form.id === result.form.id
                  ? { ...form, name: result.form.name }
                  : form,
              ),
            });
          }

          const cacheForm = trpcUtils.forms.byId.getData({
            formId: result.form.id,
          });

          if (cacheForm) {
            // Updates the current active form in the cache
            trpcUtils.forms.byId.setData(
              { formId: result.form.id },
              {
                ...cacheForm,
                name: result.form.name,
              },
            );
          }

          // Get all the recent forms from the cache
          const prevRecentForms = trpcUtils.forms.recent.getData();

          if (prevRecentForms) {
            // Update the name of the form with the matching id
            const updatedForms = prevRecentForms.map((form) =>
              form.id === result.form.id
                ? { ...form, name: result.form.name }
                : form,
            );

            // Update the cache with the modified data
            trpcUtils.forms.recent.setData(undefined, updatedForms);
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
      isDisabled={
        isSubmitting ||
        name === inputName ||
        !!errors.name ||
        !isEmptyObject(errors)
      }
      isLoading={isSubmitting}
      hasFooter={isAdmin}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            hint={errors.name?.message ? t(errors.name?.message as never) : ""}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t("general.form.inputs.name.placeholder"),
              hasError: !!errors.name,
              isDisabled: isSubmitting || !name || !isAdmin,
              maxWidth: 400,
            }}
          />
        )}
      />
    </SettingCard>
  );
};

export default FormNameCard;
