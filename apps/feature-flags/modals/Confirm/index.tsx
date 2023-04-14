import React, { useCallback } from "react";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, ButtonVariant, Text } from "@basestack/design-system";
// Store
import { useStore } from "store";
import { ConfirmModalType } from "store/types";

const getButtonVariant = (type: ConfirmModalType) => {
  const variant = {
    delete: ButtonVariant.DangerFilled,
    info: ButtonVariant.Primary,
  };

  return variant[type];
};

const ConfirmModal = () => {
  const confirmModal = useStore((state) => state.confirmModalPayload);
  const isModalOpen = useStore((state) => state.isConfirmModalOpen);
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);

  const onClose = useCallback(() => {
    setConfirmModalOpen({ isOpen: false });
  }, [setConfirmModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <Portal selector="#portal">
      <Modal
        title={confirmModal?.title}
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          {
            children: confirmModal?.buttonText,
            onClick: confirmModal?.onClick,
            variant: getButtonVariant(confirmModal?.type || "info"),
          },
        ]}
      >
        <Text size="small" muted>
          {confirmModal?.description}
        </Text>
      </Modal>
    </Portal>
  );
};

export default ConfirmModal;
