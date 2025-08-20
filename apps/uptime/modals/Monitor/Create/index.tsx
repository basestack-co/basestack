// Components
import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// Form
import type { SubmitHandler } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
//import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
// Store
import { useShallow } from "zustand/react/shallow";
// Types
import { type MonitorFormInputs, IntervalSchema } from "../types";
// Form
//import useMonitorForm, { tabPosition } from "../useMonitorForm";

import useMonitorForm from "../useMonitorForm";
// Utils
import { estimateCronCost } from "utils/helpers/estimates";

const CreateMonitorModal = () => {
  const t = useTranslations("modal");
  // const theme = useTheme();
  const trpcUtils = api.useUtils();

  const { projectId } = useParams<{ projectId: string }>();

  const [isModalOpen, setCreateMonitorModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isCreateMonitorModalOpen,
        state.setCreateMonitorModalOpen,
        state.closeModalsOnClickOutside,
      ])
    );

  const createMonitor = api.projectMonitors.create.useMutation();

  const {
    handleSubmit,
    reset,
    isSubmitting,
    onRenderTab,
    //  selectedTab,
    //  setSelectedTab,
  } = useMonitorForm();

  const isSubmittingOrMutating = isSubmitting || createMonitor.isPending;

  const onClose = () => setCreateMonitorModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<MonitorFormInputs> = async (input) => {
    try {
      const headersObj =
        typeof input.config.headers === "object" &&
        input.config.headers !== null
          ? input.config.headers
          : {};

      const cron =
        typeof input.interval === "string"
          ? input.interval
          : input.interval.value;

      createMonitor.mutate(
        {
          projectId,
          name: input.name,
          type: input.type,
          config: {
            cron,
            url: input.config.url,
            method: input.config.method,
            headers: headersObj,
            timeout: input.config.timeout,
            expectedStatus: input.config.expectedStatus,
            body: input.config.body,
            keyword: input.config.keyword,
            port: input.config.port,
            sslCheckDays: input.config.sslCheckDays,
            followRedirects: input.config.followRedirects,
            verifySSL: input.config.verifySSL,
            regions: input.config.regions,
            retries: input.config.retries,
            retryDelay: input.config.retryDelay,
            maxResponseSize: input.config.maxResponseSize,
          },
        },
        {
          onSuccess: async () => {
            await trpcUtils.projectMonitors.list.invalidate({ projectId });
            onClose();
            reset();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } catch {
      toast.error("Headers must be a valid JSON object");
    }
  };

  return (
    <Portal selector="#portal">
      <Modal
        title={t("monitor.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("monitor.create.button.cancel"), onClick: onClose },
          {
            children: t("monitor.create.button.submit"),
            onClick: handleSubmit(onSubmit),
            isLoading: isSubmittingOrMutating,
            isDisabled: isSubmittingOrMutating,
          },
        ]}
        onAnimationEnd={reset}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        {/*<Tabs
          items={[
            { text: t("monitor.tab.core.title"), id: TabType.CORE },
            { text: t("monitor.tab.advanced.title"), id: TabType.ADVANCED },
          ]}
          onSelect={(tab: string) => setSelectedTab(tab as TabType)}
          sliderPosition={tabPosition[selectedTab]}
          mb={theme.spacing.s6}
        /> */}
        {onRenderTab(false)}

        <br />
      </Modal>
    </Portal>
  );
};

export default CreateMonitorModal;
