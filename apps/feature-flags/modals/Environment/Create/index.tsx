import React, { useMemo } from "react";
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Router
import { useParams } from "next/navigation";
// Form
import { SubmitHandler } from "react-hook-form";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
// Locales
import { useTranslations } from "next-intl";
// Types
import { FormInputs } from "../types";
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

  const createEnvironment = api.environment.create.useMutation();

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

  const isSubmittingOrMutating = isSubmitting || createEnvironment.isPending;

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
