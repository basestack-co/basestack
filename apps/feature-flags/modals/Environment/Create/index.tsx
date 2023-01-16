import React, { useCallback, useMemo } from "react";
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Form
import { SubmitHandler } from "react-hook-form";
// Context
import useModals from "hooks/useModals";
import { setIsCreateEnvironmentModalOpen } from "contexts/modals/actions";
// Server
import { trpc } from "libs/trpc";
// Types
import { FormInputs } from "../types";
// Form
import useEnvironmentForm from "../useEnvironmentForm";

const CreateEnvironmentModal = () => {
  const trpcContext = trpc.useContext();
  const {
    dispatch,
    state: {
      isCreateEnvironmentModalOpen: isModalOpen,
      environmentModalPayload: { data },
    },
  } = useModals();
  const project = data && data.project;

  const createEnvironment = trpc.environment.create.useMutation();

  const [options, environments] = useMemo(() => {
    if (project) {
      const cache = trpcContext.environment.all.getData({
        projectId: project.id,
      });

      const environments = (cache && cache.environments) || [];

      const options = environments.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      return [options, environments] as const;
    }

    return [] as const;
  }, [project, trpcContext]);

  const { handleSubmit, onRenderForm, reset, isSubmitting } =
    useEnvironmentForm({ isCreate: true, options });

  const onClose = useCallback(() => {
    dispatch(setIsCreateEnvironmentModalOpen({ isOpen: false, data: null }));
    reset();
  }, [dispatch, reset]);

  const onSubmit: SubmitHandler<FormInputs> = (input: FormInputs) => {
    if (project) {
      createEnvironment.mutate(
        {
          name: input.name,
          description: input.description,
          projectId: project.id,
          copyFromEnvId: input.environmentId ?? "",
        },
        {
          onSuccess: async (result) => {
            if (project && result) {
              if (environments) {
                const updated = [result.environment, ...environments].sort(
                  (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
                );

                // Update the cache with the new data
                trpcContext.environment.all.setData(
                  { projectId: project.id },
                  {
                    environments: updated,
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

  return (
    <Portal selector="#portal">
      <Modal
        title="Create Environment"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          {
            children: "Create",
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

export default CreateEnvironmentModal;
