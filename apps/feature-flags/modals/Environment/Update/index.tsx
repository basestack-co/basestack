// Components
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { useEffect } from "react";
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

const EditEnvironmentModal = () => {
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const { projectId } = useParams<{ projectId: string }>();

  const [
    isModalOpen,
    data,
    setUpdateEnvironmentModalOpen,
    closeModalsOnClickOutside,
  ] = useStore(
    useShallow((state) => [
      state.isUpdateEnvironmentModalOpen,
      state.environmentModalPayload,
      state.setUpdateEnvironmentModalOpen,
      state.closeModalsOnClickOutside,
    ]),
  );

  const updateEnvironment = api.projectEnvironments.update.useMutation();

  const { handleSubmit, onRenderForm, reset, isSubmitting, setValue } =
    useEnvironmentForm();

  const isSubmittingOrMutating = isSubmitting || updateEnvironment.isPending;

  const onClose = () => setUpdateEnvironmentModalOpen({ isOpen: false });
  const onSubmit: SubmitHandler<FormInputs> = (input: FormInputs) => {
    if (data && projectId && data.environment) {
      updateEnvironment.mutate(
        {
          name: input.name,
          description: input.description,
          projectId,
          environmentId: data.environment.id,
        },
        {
          onSuccess: async (result) => {
            if (data) {
              // Get all the environments by project on the cache
              const prev = trpcUtils.projectEnvironments.list.getData({
                projectId,
              });

              if (prev?.environments) {
                const environments = prev.environments
                  .map((environment) =>
                    environment.id === result.environment.id
                      ? {
                          ...environment,
                          name: result.environment.name,
                          description: result.environment.description,
                        }
                      : environment,
                  )
                  .sort(
                    (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                  );

                // Update the cache with the new data
                trpcUtils.projectEnvironments.list.setData(
                  { projectId },
                  {
                    environments,
                  },
                );

                trpcUtils.projectKeys.list.invalidate({ projectId });
                trpcUtils.projectFlags.invalidate();
              }

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

  useEffect(() => {
    if (data && projectId && isModalOpen && data.environment) {
      // Get all the environments by project on the cache
      const cache = trpcUtils.projectEnvironments.list.getData({
        projectId,
      });

      if (cache?.environments) {
        const environment = cache.environments.find(
          ({ id }) => id === data?.environment?.id,
        );

        if (environment) {
          setValue("name", environment.name);
          setValue("description", environment.description ?? "");
        }
      }
    }
  }, [data, isModalOpen, trpcUtils, setValue, projectId]);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("modal.environment.update.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          {
            children: t("modal.environment.update.button.cancel"),
            onClick: onClose,
          },
          {
            children: t("modal.environment.update.button.submit"),
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

export default EditEnvironmentModal;
