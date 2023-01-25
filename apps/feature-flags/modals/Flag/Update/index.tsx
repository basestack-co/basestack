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
// Store
import { useStore } from "store";
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
  const isModalOpen = useStore((state) => state.isUpdateFlagModalOpen);
  const modalPayload = useStore((state) => state.flagModalPayload);
  const setUpdateFlagModalOpen = useStore(
    (state) => state.setUpdateFlagModalOpen
  );

  const projectSlug = router.query.projectSlug as string;
  const updateFlag = trpc.flag.update.useMutation();

  const {
    selectedTab,
    setSelectedTab,
    handleSubmit,
    isSubmitting,
    reset,
    onRenderTab,
    project,
    setValue,
  } = useFlagForm({
    isModalOpen,
    projectSlug,
    isCreate: false,
  });

  const { isLoading, data } = trpc.flag.byId.useQuery(
    { flagId: modalPayload?.flagId!, projectId: project?.id! },
    { enabled: !!project?.id && !!modalPayload?.flagId }
  );

  const onClose = useCallback(() => {
    setUpdateFlagModalOpen({ isOpen: false });
    setTimeout(reset, 250);
  }, [setUpdateFlagModalOpen, reset]);

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

      updateFlag.mutate(
        { projectId: project.id,  },
        {
          onSuccess: async (result) => {
            // doing this instead of the above because the above doesn't work
            await trpcContext.flag.all.invalidate();
            onClose();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isModalOpen && modalPayload) {
      setSelectedTab(modalPayload.selectedTab as TabType);
    }
  }, [modalPayload, isModalOpen, setSelectedTab]);

  useEffect(() => {
    if (!isLoading && data) {
      setValue("name", data.slug ?? "");
      setValue("description", data.description ?? "");
      setValue("payload", (data.payload ?? "{}") as string);
      setValue("expiredAt", data.expiredAt ?? null);
      setValue("environments", [
        {
          id: data.environment?.id ?? "",
          name: data.environment?.name ?? "",
          enabled: data.enabled ?? false,
        },
      ]);
    }
  }, [isLoading, data, setValue]);

  return (
    <Portal selector="#portal">
      <Modal
        title="Edit Flag"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          {
            children: "Update",
            onClick: handleSubmit(onSubmit),
            isDisabled: !project?.id || isLoading,
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
        {onRenderTab(isLoading)}
      </Modal>
    </Portal>
  );
};

export default UpdateFlagModal;
