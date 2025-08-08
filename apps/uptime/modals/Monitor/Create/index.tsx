import { Modal } from "@basestack/design-system";
// Components
import Portal from "@basestack/design-system/global/Portal";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";
// Store
import { useShallow } from "zustand/react/shallow";
// Types
import { MonitorType } from ".prisma/client";

const CreateMonitorModal = () => {
  const t = useTranslations("modal");

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

  const onClose = () => setCreateMonitorModalOpen({ isOpen: false });

  const isSubmittingOrMutating = createMonitor.isPending;

  return (
    <Portal selector="#portal">
      <Modal
        title={t("project.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("project.create.button.cancel"), onClick: onClose },
          {
            children: t("project.create.button.submit"),
            onClick: console.log,
            isLoading: isSubmittingOrMutating,
            isDisabled: isSubmittingOrMutating,
          },
        ]}
        onAnimationEnd={() => {}}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <button
          type="button"
          onClick={() => {
            createMonitor.mutate({
              type: MonitorType.HTTP,
              name: "TEST",
              projectId,
              cron: "*/1 * * * *", // every minute
              config: {
                url: "https://basestack.co/",
                method: "GET",
                headers: {},
                body: "{}",
                timeout: 7200,
                expectedStatus: 200,
                keyword: "",
                port: 80,
                sslCheckDays: 30,
                followRedirects: true,
                verifySSL: true,
                regions: [],
                retries: 0,
                retryDelay: 1000,
                maxResponseSize: 10 * 1024 * 1024,
              },
            });
          }}
        >
          TEST
        </button>
      </Modal>
    </Portal>
  );
};

export default CreateMonitorModal;
