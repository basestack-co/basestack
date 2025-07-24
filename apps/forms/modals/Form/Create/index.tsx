import { InputGroup, Modal } from "@basestack/design-system";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useRouter } from "next/navigation";
// Locales
import { NamespaceKeys, useTranslations } from "next-intl";
import React from "react";
// Form
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
// Theme
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
import { z } from "zod";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "form.create.input.project-name.error.max")
    .min(1, "form.create.input.project-name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const CreateFormModal = () => {
  const t = useTranslations("modal");
  const theme = useTheme();
  const router = useRouter();
  const trpcUtils = api.useUtils();

  const isModalOpen = useStore((state) => state.isCreateFormModalOpen);
  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
  );

  const createForm = api.forms.create.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const isSubmittingOrMutating = isSubmitting || createForm.isPending;

  const onClose = () => setCreateFormModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    createForm.mutate(data, {
      onSuccess: async (result) => {
        // Invalidate the form list cache
        await trpcUtils.forms.list.invalidate();
        // Reset the recent form cache
        await trpcUtils.forms.recent.invalidate();
        // Reset the usage cache
        await trpcUtils.subscription.usage.invalidate();

        onClose();

        router.push(`/a/form/${result.form.id}/submissions`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Portal selector="#portal">
      <Modal
        title={t("form.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("form.create.button.cancel"), onClick: onClose },
          {
            children: t("form.create.button.submit"),
            onClick: handleSubmit(onSubmit),
            isLoading: isSubmittingOrMutating,
            isDisabled: isSubmittingOrMutating,
          },
        ]}
        onAnimationEnd={reset}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              title={t("form.create.input.project-name.title")}
              hint={
                errors.name?.message
                  ? t(errors.name?.message as NamespaceKeys<string, "modal">)
                  : ""
              }
              inputProps={{
                type: "text",
                name: field.name,
                value: field.value,
                onChange: field.onChange,
                onBlur: field.onBlur,
                placeholder: "E.g. Contacts",
                hasError: !!errors.name,
                isDisabled: isSubmitting,
              }}
              mb={theme.spacing.s6}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default CreateFormModal;
