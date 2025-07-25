// Components
import { ButtonVariant, Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Utils
import parse from "html-react-parser";
// Locales
import { useTranslations } from "next-intl";
// React
import { useCallback } from "react";
// Store
import { useStore } from "store";
import type { ConfirmModalType } from "store/types";
import { useTheme } from "styled-components";
import { useShallow } from "zustand/react/shallow";
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
  const [isModalOpen, payload, setConfirmModalOpen, closeModalsOnClickOutside] =
    useStore(
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
        title={payload?.title!}
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("confirm.button.cancel"), onClick: onClose },
          {
            children: payload?.buttonText,
            onClick: payload?.onClick,
            variant: getButtonVariant(payload?.type || "info"),
          },
        ]}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Content mb={payload?.children ? theme.spacing.s5 : 0}>
          {parse(payload?.description ?? "")}
        </Content>
        {payload?.children}
      </Modal>
    </Portal>
  );
};

export default ConfirmModal;
