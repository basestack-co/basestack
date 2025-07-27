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

const UpdateFlagModal = () => {
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const theme = useTheme();

  const [
    isModalOpen,
    modalPayload,
    setUpdateFlagModalOpen,
    closeModalsOnClickOutside,
  ] = useStore(
    useShallow((state) => [
      state.isUpdateFlagModalOpen,
      state.flagModalPayload,
      state.setUpdateFlagModalOpen,
      state.closeModalsOnClickOutside,
    ]),
  );

  const { projectId } = useParams<{ projectId: string }>();
  const updateFlag = api.projectFlags.update.useMutation();

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
    projectId,
    flagId: modalPayload?.flag?.id,
  });

  const { isLoading, data: bySlugData } = api.projectFlags.bySlug.useQuery(
    { slug: modalPayload?.flag?.slug!, projectId: project?.id! },
    { enabled: !!project?.id && !!modalPayload?.flag?.slug },
  );

  const isSubmittingOrMutating = isSubmitting || updateFlag.isPending;

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
          onSuccess: async () => {
            await Promise.all([
              trpcUtils.projectFlags.invalidate(),
              trpcUtils.projectHistory.list.invalidate(),
            ]);

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
        title={t("modal.flag.update.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("modal.flag.update.button.cancel"), onClick: onClose },
          {
            children: t("modal.flag.update.button.submit"),
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
            { text: t("modal.flag.tab.core.title"), id: TabType.CORE },
            { text: t("modal.flag.tab.advanced.title"), id: TabType.ADVANCED },
            { text: t("modal.flag.tab.activity.title"), id: TabType.HISTORY },
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
