import React, { useCallback, useEffect } from "react";
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
import { setIsUpdateFlagModalOpen } from "contexts/modals/actions";
// Types
import { TabType } from "types/flags";
// Server
import { trpc } from "libs/trpc";
// Hooks
import useFlagForm, { tabPosition } from "../useFlagForm";

const UpdateFlagModal = () => {
  const trpcContext = trpc.useContext();
  const theme = useTheme();
  const router = useRouter();

  const {
    dispatch,
    state: { isUpdateFlagModalOpen: isModalOpen, flagModalPayload: payload },
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
  } = useFlagForm({
    isModalOpen,
    projectSlug,
    isCreate: false,
  });

  const updateFlag = trpc.flag.update.useMutation();

  const onClose = useCallback(() => {
    dispatch(setIsUpdateFlagModalOpen({ isOpen: false, data: null }));
    setTimeout(reset, 250);
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

      /* updateFlag.mutate(
        { projectId: project.id, data },
        {
          onSuccess: async (result) => {
            // doing this instead of the above because the above doesn't work
            await trpcContext.flag.byProjectSlug.invalidate();
            onClose();
          },
        }
      ); */
    }
  };

  useEffect(() => {
    if (isModalOpen && payload && payload.data) {
      setSelectedTab(payload.data.selectedTab as TabType);
    }
  }, [payload, isModalOpen, setSelectedTab]);

  return (
    <Portal selector="#portal">
      <Modal
        title={`Edit Flag`}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          {
            children: "Update",
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
            { text: "History", id: TabType.HISTORY },
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

export default UpdateFlagModal;