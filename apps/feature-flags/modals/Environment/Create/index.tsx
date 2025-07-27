import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// Form
import type { SubmitHandler } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";
import { useShallow } from "zustand/react/shallow";
// Types
import type { FormInputs } from "../types";
// Form
import useEnvironmentForm from "../useEnvironmentForm";

const CreateEnvironmentModal = () => {
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const { projectId } = useParams<{ projectId: string }>();

  const [
    isModalOpen,
    setCreateEnvironmentModalOpen,
    closeModalsOnClickOutside,
  ] = useStore(
    useShallow((state) => [
      state.isCreateEnvironmentModalOpen,
      state.setCreateEnvironmentModalOpen,
      state.closeModalsOnClickOutside,
    ]),
  );

  const createEnvironment = api.projectEnvironments.create.useMutation();

  const { handleSubmit, onRenderForm, reset, isSubmitting } =
    useEnvironmentForm(true);

  const isSubmittingOrMutating = isSubmitting || createEnvironment.isPending;

  const onClose = () => setCreateEnvironmentModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = (input: FormInputs) => {
    if (projectId) {
      createEnvironment.mutate(
        {
          name: input.name,
          description: input.description,
          projectId,
        },
        {
          onSuccess: async (result) => {
            if (result) {
              await Promise.all([
                trpcUtils.projectEnvironments.list.invalidate(),
                trpcUtils.projectKeys.list.invalidate({ projectId }),
                trpcUtils.projectFlags.invalidate(),
              ]);

              onClose();
            }
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    }
  };

  return (
    <Portal selector="#portal">
      <Modal
        title={t("modal.environment.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          {
            children: t("modal.environment.create.button.cancel"),
            onClick: onClose,
          },
          {
            children: t("modal.environment.create.button.submit"),
            onClick: handleSubmit(onSubmit),
            isDisabled: isSubmittingOrMutating,
            isLoading: isSubmittingOrMutating,
          },
        ]}
        onAnimationEnd={reset}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        {onRenderForm()}
      </Modal>
    </Portal>
  );
};

export default CreateEnvironmentModal;
