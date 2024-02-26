import React from "react";
import Portal from "@basestack/design-system/global/Portal";
import { Modal } from "@basestack/design-system";
// Store
import { useStore } from "store";
// Form
import { z } from "zod";
// Locales
import useTranslation from "next-translate/useTranslation";

export const FormSchema = z.object({
  memberId: z.string().min(1, "member.invite.input.member-id.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const ExampleModal = () => {
  const { t } = useTranslation("modals");
  const isModalOpen = useStore((state) => state.isExampleModal);
  const setExampleModal = useStore((state) => state.setExampleModal);
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
  );

  const onClose = () => {
    setExampleModal({ isOpen: false });
  };

  return (
    <Portal selector="#portal">
      <Modal
        title={t("member.invite.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("member.invite.button.cancel"), onClick: onClose },
          {
            children: t("member.invite.button.submit"),
            onClick: () => {},
            isDisabled: false,
            isLoading: false,
          },
        ]}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        Example content of the modal
      </Modal>
    </Portal>
  );
};

export default ExampleModal;
