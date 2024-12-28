import React from "react";
// Router
import { useRouter } from "next/navigation";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Theme
import { useTheme } from "styled-components";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { Modal, InputGroup } from "@basestack/design-system";
// Store
import { useStore } from "store";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";

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

  const createForm = api.form.create.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const isSubmittingOrMutating = isSubmitting || createForm.isLoading;

  const onClose = () => setCreateFormModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    createForm.mutate(data, {
      onSuccess: async (result) => {
        // Get all the projects on the cache
        const prev = trpcUtils.form.all.getData();

        if (prev && prev.forms) {
          // Add the new form with the others
          const forms = [result.form, ...prev.forms];

          // Update the cache with the new data
          trpcUtils.form.all.setData(undefined, { forms });
        }

        onClose();

        await router.push(`/form/${result.form.id}/submissions`);
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
              hint={errors.name?.message}
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
