import React, { useCallback } from "react";
import Portal from "@basestack/design-system/global/Portal";
import { Modal } from "@basestack/design-system";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
// Locales
import { useTranslations } from "next-intl";
// Components
import Activity from "components/Activity";

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
