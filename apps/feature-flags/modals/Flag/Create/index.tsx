import React from "react";
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
// Hooks
import useFlagForm, { tabPosition } from "../useFlagForm";

const CreateFlagModal = () => {
  const trpcContext = trpc.useContext();
  const theme = useTheme();
  const router = useRouter();
  const isModalOpen = useStore((state) => state.isCreateFlagModalOpen);
  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen
  );
  const projectSlug = router.query.projectSlug as string;

  const {
    selectedTab,
    setSelectedTab,
    handleSubmit,
    isSubmitting,
    reset,
    onRenderTab,
    project,
  } = useFlagForm({ isModalOpen, projectSlug, isCreate: true });

  const createFlag = trpc.flag.create.useMutation();

  const onClose = () => setCreateFlagModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FlagFormInputs> = async (input) => {
    if (project) {
      const data = input.environments.map((env) => ({
        slug: input.name,
        description: input.description,
        environmentId: env.id,
        enabled: env.enabled,
        payload: input.payload,
        expiredAt: input.expiredAt,
      }));

      createFlag.mutate(
        { projectId: project.id, environments: input.environments, data },
        {
          onSuccess: async (result) => {
            // TODO: migrate this to use cache from useQuery
            await trpcContext.flag.all.invalidate();
            onClose();
          },
        }
      );
    }
  };

  return (
    <Portal selector="#portal">
      <Modal
        title="Create Flag"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          {
            children: "Create",
            onClick: handleSubmit(onSubmit),
            isDisabled: !project?.id,
            isLoading: isSubmitting,
          },
        ]}
        onAnimationEnd={reset}
      >
        <Tabs
          items={[
            { text: "Core", id: TabType.CORE },
            { text: "Advanced", id: TabType.ADVANCED },
          ]}
          onSelect={(tab: string) => setSelectedTab(tab as TabType)}
          sliderPosition={tabPosition[selectedTab]}
          mb={theme.spacing.s6}
        />
        {onRenderTab()}
      </Modal>
    </Portal>
  );
};

export default CreateFlagModal;
