import React, { useMemo } from "react";
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Form
import { SubmitHandler } from "react-hook-form";
// Server
import { trpc } from "libs/trpc";
// Store
import { useStore } from "store";
import { shallow } from "zustand/shallow";
// Locales
import useTranslation from "next-translate/useTranslation";
// Types
import { FormInputs } from "../types";
// Form
import useEnvironmentForm from "../useEnvironmentForm";

const CreateEnvironmentModal = () => {
  const { t } = useTranslation("modals");
  const trpcContext = trpc.useContext();
  const { isModalOpen, data, setCreateEnvironmentModalOpen } = useStore(
    (state) => ({
      isModalOpen: state.isCreateEnvironmentModalOpen,
      data: state.environmentModalPayload,
      setCreateEnvironmentModalOpen: state.setCreateEnvironmentModalOpen,
    }),
    shallow,
  );
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
  );

  const project = data && data.project;
  const createEnvironment = trpc.environment.create.useMutation();

  const [environments, defaultEnvironment] = useMemo(() => {
    if (project) {
      const cache = trpcContext.environment.all.getData({
        projectId: project.id!,
      });

      const environments = (cache && cache.environments) || [];
      const defaultEnvironment = environments.find((env) => env.isDefault);

      return [environments, defaultEnvironment] as const;
    }

    return [] as const;
  }, [project, trpcContext]);

  const { handleSubmit, onRenderForm, reset, isSubmitting } =
    useEnvironmentForm(true);

  const isSubmittingOrMutating = isSubmitting || createEnvironment.isLoading;

  const onClose = () => setCreateEnvironmentModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = (input: FormInputs) => {
    if (project) {
      createEnvironment.mutate(
        {
          name: input.name,
          description: input.description,
          projectId: project.id!,
          copyFromEnvId: defaultEnvironment?.id ?? "",
        },
        {
          onSuccess: async (result) => {
            if (project && result) {
              if (environments) {
                const updated = [result.environment, ...environments].sort(
                  (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                );

                // Update the cache with the new data
                trpcContext.environment.all.setData(
                  { projectId: project.id! },
                  {
                    environments: updated,
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

  return (
    <Portal selector="#portal">
      <Modal
        title={t("environment.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("environment.create.button.cancel"), onClick: onClose },
          {
            children: t("environment.create.button.submit"),
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
