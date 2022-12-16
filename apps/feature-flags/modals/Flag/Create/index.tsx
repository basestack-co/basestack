import React, { useCallback } from "react";
// Router
import { useRouter } from "next/router";
// Components
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, Tabs } from "@basestack/design-system";
// Form
import { SubmitHandler } from "react-hook-form";
import { FlagFormInputs } from "../types";
// Context
import useModals from "hooks/useModals";
import { setIsCreateFlagModalOpen } from "contexts/modals/actions";
// Types
import { TabType } from "types/flags";
// Server
import { trpc } from "libs/trpc";
// Hooks
import useFlagForm from "../useFlagForm";

const CreateFlagModal = () => {
  const trpcContext = trpc.useContext();
  const theme = useTheme();
  const router = useRouter();

  const {
    dispatch,
    state: { isCreateFlagModalOpen: isModalOpen, flagModalPayload: payload },
  } = useModals();

  const projectSlug = router.query.projectSlug as string;

  const {
    selectedTab,
    setSelectedTab,
    handleSubmit,
    isSubmitting,
    reset,
    onRenderTab,
    project,
  } = useFlagForm({ isModalOpen, projectSlug });

  const createFlag = trpc.flag.create.useMutation();

  const onClose = useCallback(() => {
    dispatch(
      setIsCreateFlagModalOpen({ isOpen: false, isEdit: false, data: null })
    );
    reset();
  }, [dispatch, reset]);

  const onSubmit: SubmitHandler<FlagFormInputs> = async (input) => {
    if (project) {
      const data = input.environments.map((env) => ({
        slug: input.name,
        description: input.description,
        environmentId: env.id,
        enabled: env.enabled,
        payload: JSON.stringify({}),
        expiredAt: null,
      }));

      createFlag.mutate(
        { projectId: project.id, data },
        {
          onSuccess: async (result) => {
            await trpcContext.flag.byProjectSlug.invalidate();
            onClose();
          },
        }
      );
    }
  };

  return (
    <Portal selector="#portal">
      <Modal
        title={`${payload.isEdit ? "Edit" : "Create"} Flag`}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          {
            children: payload.isEdit ? "Update" : "Create",
            onClick: handleSubmit(onSubmit),
            isDisabled: !project?.id,
            isLoading: isSubmitting,
          },
        ]}
      >
        <Tabs
          items={[
            { text: "Core", id: TabType.CORE },
            { text: "Advanced", id: TabType.ADVANCED },
          ]}
          onSelect={(tab: string) => setSelectedTab(tab as TabType)}
          sliderPosition={selectedTab === TabType.ADVANCED ? 1 : 0}
          mb={theme.spacing.s6}
        />
        {onRenderTab()}
      </Modal>
    </Portal>
  );
};

export default CreateFlagModal;
