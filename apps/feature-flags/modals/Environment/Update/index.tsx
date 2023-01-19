import React, { useCallback, useEffect } from "react";
// Components
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Form
import { SubmitHandler } from "react-hook-form";
// Store
import { useStore } from "store";
// Server
import { trpc } from "libs/trpc";
// Types
import { FormInputs } from "../types";
// Form
import useEnvironmentForm from "../useEnvironmentForm";
import { HistoryAction } from "types/history";

const EditEnvironmentModal = () => {
  const trpcContext = trpc.useContext();
  const isModalOpen = useStore((state) => state.isUpdateEnvironmentModalOpen);
  const data = useStore((state) => state.environmentModalPayload);
  const setUpdateEnvironmentModalOpen = useStore(
    (state) => state.setUpdateEnvironmentModalOpen
  );

  const updateEnvironment = trpc.environment.update.useMutation();

  const { handleSubmit, onRenderForm, reset, isSubmitting, setValue } =
    useEnvironmentForm({});

  const onClose = useCallback(() => {
    setUpdateEnvironmentModalOpen(false, null);
    reset();
  }, [reset, setUpdateEnvironmentModalOpen]);

  const onSubmit: SubmitHandler<FormInputs> = (input: FormInputs) => {
    if (data && data.project && data.environment) {
      updateEnvironment.mutate(
        {
          name: input.name,
          description: input.description,
          projectId: data.project.id,
          environmentId: data.environment.id,
        },
        {
          onSuccess: async (result) => {
            if (data && data.project) {
              // Get all the environments by project on the cache

              const prev = trpcContext.environment.all.getData({
                projectId: data.project.id,
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
                      : environment
                  )
                  .sort(
                    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
                  );

                // Update the cache with the new data
                trpcContext.environment.all.setData(
                  { projectId: data.project.id },
                  {
                    environments,
                  }
                );
              }

              onClose();
            }
          },
        }
      );
    }
  };

  useEffect(() => {
    if (data && data.project && isModalOpen && data.environment) {
      // Get all the environments by project on the cache
      const cache = trpcContext.environment.all.getData({
        projectId: data.project.id,
      });

      if (cache && cache.environments) {
        const environment = cache.environments.find(
          ({ id }) => id === data?.environment?.id
        );

        if (environment) {
          setValue("name", environment.name);
          setValue("description", environment.description ?? "");
        }
      }
    }
  }, [data, isModalOpen, trpcContext, setValue]);

  return (
    <Portal selector="#portal">
      <Modal
        title="Edit Environment"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          {
            children: "Update",
            onClick: handleSubmit(onSubmit),
            isDisabled: isSubmitting,
            isLoading: isSubmitting,
          },
        ]}
      >
        {onRenderForm()}
      </Modal>
    </Portal>
  );
};

export default EditEnvironmentModal;
