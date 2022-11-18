import React, { useCallback } from "react";
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Form
import { SubmitHandler } from "react-hook-form";
// Context
import useModals from "hooks/useModals";
import { setIsCreateEnvironmentModalOpen } from "contexts/modals/actions";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";
// Router
import { useRouter } from "next/router";
// Types
import { HistoryAction } from "types/history";
import { FormInputs } from "../types";
// Form
import useEnvironmentForm from "../useEnvironmentForm";

const CreateEnvironmentModal = () => {
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const { onCreateHistory } = useCreateApiHistory();
  const {
    dispatch,
    state: {
      isCreateEnvironmentModalOpen: isModalOpen,
      environmentModalPayload: { data },
    },
  } = useModals();

  const createEnvironment = trpc.useMutation(["environment.create"]);

  const { handleSubmit, onRenderForm, reset, isSubmitting } =
    useEnvironmentForm();

  const onClose = useCallback(() => {
    dispatch(setIsCreateEnvironmentModalOpen({ isOpen: false, data: null }));
    reset();
  }, [dispatch, reset]);

  const onSubmit: SubmitHandler<FormInputs> = (input: FormInputs) => {
    if (data && data.project) {
      createEnvironment.mutate(
        {
          name: input.name,
          description: input.description,
          projectId: data.project.id,
        },
        {
          onSuccess: (result) => {
            if (data && data.project) {
              // Get all the environments by project on the cache
              const prev = trpcContext.getQueryData([
                "environment.all",
                { projectSlug: data.project.slug },
              ]);

              if (prev && prev.environments) {
                const environments = [
                  result.environment,
                  ...prev.environments,
                ].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

                // Update the cache with the new data
                trpcContext.setQueryData(
                  ["environment.all", { projectSlug: data.project.slug }],
                  {
                    environments,
                  }
                );
              }

              onCreateHistory(HistoryAction.createEnvironment, {
                projectId: data.project.id,
                payload: {
                  environment: {
                    id: result.environment.id,
                    name: result.environment.name,
                    slug: result.environment.slug,
                    description: result.environment.description ?? "",
                  },
                },
              });

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
        title="Create New Environment"
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
