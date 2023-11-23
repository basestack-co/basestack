import React, { useEffect } from "react";
// Router
import { useRouter } from "next/router";
// Components
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, Tabs } from "@basestack/design-system";
// Form
import { SubmitHandler } from "react-hook-form";
import { FlagFormInputs } from "../types";
// Store
import { useStore } from "store";
// Types
import { TabType } from "types";
// Server
import { trpc } from "libs/trpc";
// Locales
import useTranslation from "next-translate/useTranslation";
// Hooks
import useFlagForm, { tabPosition } from "../useFlagForm";

const CreateFlagModal = () => {
  const { t } = useTranslation("modals");
  const trpcUtils = trpc.useUtils();
  const theme = useTheme();
  const router = useRouter();
  const isModalOpen = useStore((state) => state.isCreateFlagModalOpen);
  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen,
  );
  const projectSlug = router.query.projectSlug as string;
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
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
  } = useFlagForm({ isModalOpen, projectSlug });

  const createFlag = trpc.flag.create.useMutation();

  const { data, isLoading } = trpc.environment.all.useQuery(
    { projectId: project?.id! },
    {
      enabled: !!project?.id,
      keepPreviousData: true,
    },
  );

  const isSubmittingOrMutating = isSubmitting || createFlag.isLoading;

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
          onSuccess: async (result) => {
            // Refresh the flag list and close the modal
            await trpcUtils.flag.all.invalidate({ projectId: project.id });
            onClose();
          },
        },
      );
    }
  };

  useEffect(() => {
    if (isModalOpen && !isLoading) {
      const environments = ((data && data.environments) || []).map(
        ({ id, name }) => ({
          id,
          name,
          enabled: false,
          payload: JSON.stringify({}),
          expiredAt: null,
        }),
      );
      setValue("environments", environments);
    }
  }, [isModalOpen, data, isLoading, setValue]);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("flag.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("flag.create.button.cancel"), onClick: onClose },
          {
            children: t("flag.create.button.submit"),
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
            { text: t("flag.tab.core.title"), id: TabType.CORE },
            { text: t("flag.tab.advanced.title"), id: TabType.ADVANCED },
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
