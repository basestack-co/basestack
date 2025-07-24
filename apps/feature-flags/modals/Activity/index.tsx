import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Components
import Activity from "components/Activity";
// Locales
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";

const ActivityModal = () => {
  const t = useTranslations("modal");
  const [isModalOpen, setActivityModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isActivityModalOpen,
        state.setActivityModalOpen,
        state.closeModalsOnClickOutside,
      ]),
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
