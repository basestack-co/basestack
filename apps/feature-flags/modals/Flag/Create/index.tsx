import { Modal, Tabs } from "@basestack/design-system";
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
// Components
import { useTheme } from "styled-components";
// Types
import { TabType } from "types";
// Server
import { api } from "utils/trpc/react";
import { useShallow } from "zustand/react/shallow";
import type { FlagFormInputs } from "../types";
// Hooks
import useFlagForm, { tabPosition } from "../useFlagForm";

const CreateFlagModal = () => {
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const theme = useTheme();
  const { projectId } = useParams<{ projectId: string }>();
  const [isModalOpen, setCreateFlagModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isCreateFlagModalOpen,
        state.setCreateFlagModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const {
    selectedTab,
    setSelectedTab,
    handleSubmit,
    isSubmitting,
    reset,
    onRenderTab,
    project,
    setValue,
  } = useFlagForm({ isModalOpen, projectId });

  const createFlag = api.projectFlags.create.useMutation();

  const { data, isLoading } = api.projectEnvironments.list.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  const isSubmittingOrMutating = isSubmitting || createFlag.isPending;

  const onClose = () => setCreateFlagModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FlagFormInputs> = async (input) => {
    if (project) {
      const data = input.environments.map((env) => ({
        ...env,
        slug: input.name,
        description: input.description,
        environmentId: env.id,
        payload: JSON.parse(env.payload),
      }));

      createFlag.mutate(
        { projectId: project.id, environments: input.environments, data },
        {
          onSuccess: async () => {
            // Refresh the flag list and close the modal
            await trpcUtils.projectFlags.list.invalidate({
              projectId: project.id,
            });
            await trpcUtils.projects.recent.invalidate();
            // Reset the usage cache
            await trpcUtils.subscription.usage.invalidate();
            onClose();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (isModalOpen && !isLoading) {
      const environments = (data?.environments || []).map(({ id, name }) => ({
        id,
        name,
        enabled: false,
        payload: JSON.stringify({}),
        expiredAt: null,
      }));
      setValue("environments", environments);
    }
  }, [isModalOpen, data, isLoading, setValue]);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("modal.flag.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("modal.flag.create.button.cancel"), onClick: onClose },
          {
            children: t("modal.flag.create.button.submit"),
            onClick: handleSubmit(onSubmit),
            isDisabled: !project?.id || isSubmittingOrMutating,
            isLoading: isSubmittingOrMutating,
          },
        ]}
        onAnimationEnd={reset}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Tabs
          items={[
            { text: t("modal.flag.tab.core.title"), id: TabType.CORE },
            { text: t("modal.flag.tab.advanced.title"), id: TabType.ADVANCED },
          ]}
          onSelect={(tab: string) => setSelectedTab(tab as TabType)}
          sliderPosition={tabPosition[selectedTab]}
          mb={theme.spacing.s6}
        />
        {onRenderTab(isLoading)}
      </Modal>
    </Portal>
  );
};

export default CreateFlagModal;
