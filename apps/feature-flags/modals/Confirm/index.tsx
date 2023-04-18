import React, { useCallback } from "react";
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, ButtonVariant } from "@basestack/design-system";
// Store
import { useStore } from "store";
import { ConfirmModalType } from "store/types";
import { Content } from "./styles";

const getButtonVariant = (type: ConfirmModalType) => {
  const variant = {
    delete: ButtonVariant.DangerFilled,
    info: ButtonVariant.Primary,
  };

  return variant[type];
};

const ConfirmModal = () => {
  const theme = useTheme();
  const confirmModal = useStore((state) => state.confirmModalPayload);
  const isModalOpen = useStore((state) => state.isConfirmModalOpen);
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);

  // TODO do the same to the other modals for reset using the onAnimationEnd callback

  // TODO fix the ui on the inputs when they are already filled looks like its a placeholder

  const onClose = useCallback(() => {
    setConfirmModalOpen({ isOpen: false });
  }, [setConfirmModalOpen]);

  return (
    <Portal selector="#portal">
      <Modal
        title={confirmModal?.title!}
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
        <Content
          dangerouslySetInnerHTML={{ __html: confirmModal?.description! }}
          mb={confirmModal?.children ? theme.spacing.s5 : 0}
        />
        {confirmModal?.children}
      </Modal>
    </Portal>
  );
};

export default ConfirmModal;
