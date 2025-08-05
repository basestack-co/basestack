import { InputGroup, Modal } from "@basestack/design-system";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useRouter } from "next/navigation";
// Locales
import { type NamespaceKeys, useTranslations } from "next-intl";
// Form
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "service.create.input.service-name.error.max")
    .min(1, "service.create.input.service-name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const CreateServiceModal = () => {
  const t = useTranslations("modal");
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const [isModalOpen, setCreateServiceModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isCreateServiceModalOpen,
        state.setCreateServiceModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const createService = api.services.create.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const isSubmittingOrMutating = isSubmitting || createService.isPending;

  const onClose = () => setCreateServiceModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    createService.mutate(data, {
      onSuccess: async (result) => {
        // Invalidate the service list cache
        await trpcUtils.services.list.invalidate();
        onClose();

        router.push(`/a/service/${result.service.id}/monitors`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Portal selector="#portal">
      <Modal
        title={t("service.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("service.create.button.cancel"), onClick: onClose },
          {
            children: t("service.create.button.submit"),
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
              title={t("service.create.input.service-name.title")}
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
                placeholder: "E.g. Chat",
                hasError: !!errors.name,
                isDisabled: isSubmitting,
              }}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default CreateServiceModal;
