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
    .max(30, "project.create.input.project-name.error.max")
    .min(1, "project.create.input.project-name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const CreateProjectModal = () => {
  const t = useTranslations("modal");
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const [isModalOpen, setCreateProjectModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isCreateProjectModalOpen,
        state.setCreateProjectModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const createProject = api.projects.create.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const isSubmittingOrMutating = isSubmitting || createProject.isPending;

  const onClose = () => setCreateProjectModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    createProject.mutate(data, {
      onSuccess: async (result) => {
        // Invalidate the project list cache
        await trpcUtils.projects.list.invalidate();
        onClose();

        router.push(`/a/project/${result.project.id}/monitors`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Portal selector="#portal">
      <Modal
        title={t("project.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("project.create.button.cancel"), onClick: onClose },
          {
            children: t("project.create.button.submit"),
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
              title={t("project.create.input.project-name.title")}
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
                placeholder: "E.g. My Project",
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

export default CreateProjectModal;
