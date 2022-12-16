import React, { useCallback, useState, useEffect } from "react";
// Router
import { useRouter } from "next/router";
// Components
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, Tabs } from "@basestack/design-system";
// Form
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlagFormInputs, FlagFormSchema } from "./types";
// Context
import useModals from "hooks/useModals";
import { setIsCreateFlagModalOpen } from "contexts/modals/actions";
// Types
import { HistoryAction } from "types/history";
import { TabType } from "types/flags";
// Server
import { trpc } from "libs/trpc";
// Utils
import { getValue } from "@basestack/utils";
// Tabs
import Core from "./Tab/Core";
import Advance from "./Tab/Advance";
import History from "./Tab/History";

const FlagModal = () => {
  const trpcContext = trpc.useContext();
  const theme = useTheme();
  const router = useRouter();

  const {
    dispatch,
    state: { isCreateFlagModalOpen: isModalOpen, flagModalPayload: payload },
  } = useModals();
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.CORE);

  const projectSlug = router.query.projectSlug as string;

  const { data: current } = trpc.project.bySlug.useQuery(
    { projectSlug },
    { enabled: !!projectSlug && isModalOpen }
  );

  const { data: envData, isLoading: isEnvLoading } =
    trpc.environment.all.useQuery(
      { projectSlug },
      { enabled: !!projectSlug && isModalOpen }
    );

  const createFlag = trpc.flag.create.useMutation({
    async onSuccess() {
      await trpcContext.flag.byProjectSlug.invalidate();
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FlagFormInputs>({
    resolver: zodResolver(FlagFormSchema),
    mode: "onChange",
  });

  const onClose = useCallback(() => {
    dispatch(
      setIsCreateFlagModalOpen({ isOpen: false, isEdit: false, data: null })
    );
    reset();
  }, [dispatch, reset]);

  const onSubmit: SubmitHandler<FlagFormInputs> = async (input) => {
    const data = input.environments.map((env) => ({
      slug: input.name,
      description: input.description,
      environmentId: env.id,
      enabled: env.enabled,
      payload: JSON.stringify({}),
      expiredAt: null,
    }));

    await createFlag.mutate(
      { projectId: current?.project?.id!, data },
      {
        onSuccess: async (result) => {
          onClose();
        },
      }
    );
  };

  useEffect(() => {
    if (!isEnvLoading && envData && envData.environments && isModalOpen) {
      const environments = envData.environments.map(({ id, name }) => ({
        id,
        name,
        enabled: false,
      }));
      setValue("environments", environments);
    }
  }, [envData, isEnvLoading, isModalOpen, setValue]);

  const onRenderTab = () => {
    switch (selectedTab) {
      case TabType.CORE:
      default:
        return (
          <Core
            environments={watch("environments")}
            setValue={setValue}
            errors={errors}
            control={control}
            isSubmitting={isSubmitting}
          />
        );
      case TabType.ADVANCED:
        return <Advance setValue={setValue} />;
      case TabType.HISTORY:
        return <History />;
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
            isDisabled: !current?.project?.id,
            isLoading: isSubmitting,
          },
        ]}
      >
        <Tabs
          items={[
            { text: "Core", id: TabType.CORE },
            { text: "Advanced", id: TabType.ADVANCED },
            ...(payload.isEdit
              ? [{ text: "History", id: TabType.HISTORY }]
              : []),
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

export default FlagModal;
