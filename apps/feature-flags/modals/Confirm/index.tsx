import React, { useCallback } from "react";
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, ButtonVariant } from "@basestack/design-system";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
import { ConfirmModalType } from "store/types";
// Locales
import { useTranslations } from "next-intl";
// Styles
import { Content } from "./styles";

const getButtonVariant = (type: ConfirmModalType) => {
  const variant = {
    delete: ButtonVariant.DangerFilled,
    info: ButtonVariant.Primary,
  };

  return variant[type];
};

const ConfirmModal = () => {
    const t = useTranslations("modal");
  const theme = useTheme();
  const [
    isModalOpen,
    confirmModal,
    setConfirmModalOpen,
    closeModalsOnClickOutside,
  ] = useStore(
    useShallow((state) => [
      state.isConfirmModalOpen,
      state.confirmModalPayload,
      state.setConfirmModalOpen,
      state.closeModalsOnClickOutside,
    ]),
  );

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
          { children: t("confirm.button.cancel"), onClick: onClose },
          {
            children: confirmModal?.buttonText,
            onClick: confirmModal?.onClick,
            variant: getButtonVariant(confirmModal?.type || "info"),
          },
        ]}
        closeOnClickOutside={closeModalsOnClickOutside}
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
