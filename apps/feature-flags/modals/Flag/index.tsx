import React, { useCallback, useState } from "react";
// Router
import { useRouter } from "next/router";
// Components
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, Tabs } from "@basestack/design-system";
// Context
import useModals from "hooks/useModals";
import { setIsFlagModalOpen } from "contexts/modals/actions";
// Types
import { HistoryAction } from "types/history";
import { TabType } from "types/flags";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";
// Utils
import { getValue } from "@basestack/utils";
// Tabs
import Core from "./Tab/Core";
import Advance from "./Tab/Advance";
import History from "./Tab/History";
// Hooks
import useFlagForm from "./useFlagForm";

const FlagModal = () => {
  const trpcContext = trpc.useContext();
  const theme = useTheme();
  const router = useRouter();

  const {
    dispatch,
    state: { isFlagModalOpen: isModalOpen, flagModalPayload: payload },
  } = useModals();
  const { onCreateHistory } = useCreateApiHistory();
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.CORE);

  const projectSlug = router.query.projectSlug as string;

  const createFlag = trpc.useMutation(["flag.create"], {
    async onSuccess(_, form) {
      onCreateHistory(HistoryAction.createFlag, {
        projectId: form.projectId,
        payload: {
          flag: {
            id: "",
            slug: getValue(form, "data[0].slug", ""),
            enabled: getValue(form, "data[0].enabled", false),
            description: getValue(form, "data[0].description", ""),
          },
          environment: form.data.map(({ environmentId }) => ({
            id: environmentId,
          })),
        },
      });

      await trpcContext.invalidateQueries(["flag.byProjectSlug"]);
    },
  });

  const onClose = useCallback(() => {
    dispatch(setIsFlagModalOpen({ isOpen: false, isEdit: false, data: null }));
    formik.resetForm();
  }, [dispatch]);

  const { formik, current } = useFlagForm({
    projectSlug,
    isModalOpen,
    onSubmit: (values) => {
      const data = values.environments.map((env) => ({
        slug: values.name,
        description: values.description,
        environmentId: env.id,
        enabled: env.enabled,
        payload: JSON.stringify({}),
        expiredAt: null,
      }));

      createFlag.mutate({ projectId: current?.project?.id!, data });
      onClose();
    },
  });

  const onRenderTab = useCallback(() => {
    switch (selectedTab) {
      case TabType.CORE:
      default:
        return <Core form={formik} />;
      case TabType.ADVANCED:
        return <Advance form={formik} />;
      case TabType.HISTORY:
        return <History />;
    }
  }, [selectedTab, formik]);

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
            onClick: formik.handleSubmit,
            isDisabled: !current?.project?.id,
            isLoading: formik.isSubmitting,
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
          onSelect={(tab: TabType) => setSelectedTab(tab)}
          sliderPosition={selectedTab === TabType.ADVANCED ? 1 : 0}
          mb={theme.spacing.s6}
        />
        {onRenderTab()}
      </Modal>
    </Portal>
  );
};

export default FlagModal;
