import React, { useCallback } from "react";
import Portal from "@basestack/design-system/global/Portal";
import { Modal } from "@basestack/design-system";
// Store
import { useStore } from "store";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import Activity from "components/Activity";

const ActivityModal = () => {
  const { t } = useTranslation("modals");
  const isModalOpen = useStore((state) => state.isActivityModalOpen);
  const setActivityModalOpen = useStore((state) => state.setActivityModalOpen);
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
  );

  const onClose = useCallback(() => {
    setActivityModalOpen({ isOpen: false });
  }, [setActivityModalOpen]);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("activity.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Activity />
      </Modal>
    </Portal>
  );
};

export default ActivityModal;
