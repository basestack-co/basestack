import React, { useEffect } from "react";
// Router
import { useRouter } from "next/router";
// Components
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Form
import { SubmitHandler } from "react-hook-form";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
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
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

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

  const updateEnvironment = trpc.environment.update.useMutation();

  const { handleSubmit, onRenderForm, reset, isSubmitting, setValue } =
    useEnvironmentForm();

  const isSubmittingOrMutating = isSubmitting || updateEnvironment.isLoading;

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
              const prev = trpcUtils.environment.all.getData({
                projectId,
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
                  { projectId },
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
    if (data && projectId && isModalOpen && data.environment) {
      // Get all the environments by project on the cache
      const cache = trpcUtils.environment.all.getData({
        projectId,
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
  }, [data, isModalOpen, trpcUtils, setValue, projectId]);

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
