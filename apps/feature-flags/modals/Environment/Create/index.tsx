import React, { useMemo } from "react";
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Router
import { useRouter } from "next/router";
// Form
import { SubmitHandler } from "react-hook-form";
// Server
import { trpc } from "libs/trpc";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
// Locales
import useTranslation from "next-translate/useTranslation";
// Types
import { FormInputs } from "../types";
// Form
import useEnvironmentForm from "../useEnvironmentForm";

const CreateEnvironmentModal = () => {
  const { t } = useTranslation("modals");
  const trpcUtils = trpc.useUtils();
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

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

  const createEnvironment = trpc.environment.create.useMutation();

  const [environments, defaultEnvironment] = useMemo(() => {
    if (projectId) {
      const cache = trpcUtils.environment.all.getData({
        projectId,
      });

      const environments = (cache && cache.environments) || [];
      const defaultEnvironment = environments.find((env) => env.isDefault);

      return [environments, defaultEnvironment] as const;
    }

    return [] as const;
  }, [projectId, trpcUtils]);

  const { handleSubmit, onRenderForm, reset, isSubmitting } =
    useEnvironmentForm(true);

  const isSubmittingOrMutating = isSubmitting || createEnvironment.isLoading;

  const onClose = () => setCreateEnvironmentModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = (input: FormInputs) => {
    if (projectId) {
      createEnvironment.mutate(
        {
          name: input.name,
          description: input.description,
          projectId,
          copyFromEnvId: defaultEnvironment?.id ?? "",
        },
        {
          onSuccess: async (result) => {
            if (result) {
              if (environments) {
                const updated = [result.environment, ...environments].sort(
                  (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                );

                // Update the cache with the new data
                trpcUtils.environment.all.setData(
                  { projectId },
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
