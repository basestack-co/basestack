import React, { useEffect } from "react";
// Components
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Form
import { SubmitHandler } from "react-hook-form";
// Store
import { useStore } from "store";
// Server
import { trpc } from "libs/trpc";
// Locales
import useTranslation from "next-translate/useTranslation";
// Types
import { FormInputs } from "../types";
// Form
import useEnvironmentForm from "../useEnvironmentForm";

const EditEnvironmentModal = () => {
  const { t } = useTranslation("modals");
  const trpcUtils = trpc.useUtils();
  const isModalOpen = useStore((state) => state.isUpdateEnvironmentModalOpen);
  const data = useStore((state) => state.environmentModalPayload);
  const setUpdateEnvironmentModalOpen = useStore(
    (state) => state.setUpdateEnvironmentModalOpen,
  );
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
  );

  const updateEnvironment = trpc.environment.update.useMutation();

  const { handleSubmit, onRenderForm, reset, isSubmitting, setValue } =
    useEnvironmentForm();

  const isSubmittingOrMutating = isSubmitting || updateEnvironment.isLoading;

  const onClose = () => setUpdateEnvironmentModalOpen({ isOpen: false });
  const onSubmit: SubmitHandler<FormInputs> = (input: FormInputs) => {
    if (data && data.project && data.environment) {
      updateEnvironment.mutate(
        {
          name: input.name,
          description: input.description,
          projectId: data.project.id!,
          environmentId: data.environment.id,
        },
        {
          onSuccess: async (result) => {
            if (data && data.project) {
              // Get all the environments by project on the cache
              const prev = trpcUtils.environment.all.getData({
                projectId: data.project.id!,
              });

              if (prev && prev.environments) {
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
                trpcUtils.environment.all.setData(
                  { projectId: data.project.id! },
                  {
                    environments,
                  },
                );
              }

              onClose();
            }
          },
        },
      );
    }
  };

  useEffect(() => {
    if (data && data.project && isModalOpen && data.environment) {
      // Get all the environments by project on the cache
      const cache = trpcUtils.environment.all.getData({
        projectId: data.project.id!,
      });

      if (cache && cache.environments) {
        const environment = cache.environments.find(
          ({ id }) => id === data?.environment?.id,
        );

        if (environment) {
          setValue("name", environment.name);
          setValue("description", environment.description ?? "");
        }
      }
    }
  }, [data, isModalOpen, trpcUtils, setValue]);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("environment.update.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("environment.update.button.cancel"), onClick: onClose },
          {
            children: t("environment.update.button.submit"),
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
