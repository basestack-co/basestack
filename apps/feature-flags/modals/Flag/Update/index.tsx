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

const UpdateFlagModal = () => {
  const { t } = useTranslation("modals");
  const trpcUtils = trpc.useUtils();
  const theme = useTheme();
  const router = useRouter();
  const isModalOpen = useStore((state) => state.isUpdateFlagModalOpen);
  const modalPayload = useStore((state) => state.flagModalPayload);
  const setUpdateFlagModalOpen = useStore(
    (state) => state.setUpdateFlagModalOpen,
  );
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
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
    flagId: modalPayload?.flag?.id,
  });

  const { isLoading, data: bySlugData } = trpc.flag.bySlug.useQuery(
    { slug: modalPayload?.flag?.slug!, projectId: project?.id! },
    { enabled: !!project?.id && !!modalPayload?.flag?.slug },
  );

  const isSubmittingOrMutating = isSubmitting || updateFlag.isLoading;

  const onClose = () => setUpdateFlagModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FlagFormInputs> = async (input) => {
    if (project && bySlugData) {
      const data = input.environments.map((env) => ({
        id: env?.flagId!,
        slug: input.name,
        description: input.description ?? "",
        enabled: env.enabled,
        payload: JSON.parse(env.payload),
        expiredAt: env.expiredAt,
      }));

      updateFlag.mutate(
        {
          projectId: project.id,
          environments: input.environments,
          data,
        },
        {
          onSuccess: async (result) => {
            // doing this instead of the above because the above doesn't work
            await trpcUtils.flag.all.invalidate({ projectId: project.id });
            await trpcUtils.flag.environments.invalidate({
              projectId: project.id,
              slug: modalPayload?.flag.slug,
            });
            onClose();
          },
        },
      );
    }
  };

  useEffect(() => {
    if (isModalOpen && modalPayload) {
      setSelectedTab(modalPayload.selectedTab as TabType);
    }
  }, [modalPayload, isModalOpen, setSelectedTab]);

  useEffect(() => {
    if (!isLoading && bySlugData) {
      setValue("name", bySlugData.slug ?? "");
      setValue("description", bySlugData.description ?? "");
      setValue("environments", bySlugData.environments);
    }
  }, [isLoading, bySlugData, setValue]);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("flag.update.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("flag.update.button.cancel"), onClick: onClose },
          {
            children: t("flag.update.button.submit"),
            onClick: handleSubmit(onSubmit),
            isDisabled: isSubmittingOrMutating || isLoading || !project?.id,
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
            { text: t("flag.tab.activity.title"), id: TabType.HISTORY },
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
