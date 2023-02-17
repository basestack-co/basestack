import React, { useCallback } from "react";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, InputGroup } from "@basestack/design-system";
// Store
import { useStore } from "store";

const InviteMemberModal = () => {
  const isModalOpen = useStore((state) => state.isInviteMemberModalOpen);
  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen
  );

  const onClose = useCallback(() => {
    setInviteMemberModalOpen({ isOpen: false });
  }, [setInviteMemberModalOpen]);

  return (
    <Portal selector="#portal">
      <Modal
        title="Invite Team Member"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          { children: "Send Invite", onClick: () => console.log("invite") },
        ]}
      >
        <InputGroup
          title="Email"
          inputProps={{
            onChange: (text) => console.log("text = ", text),
            placeholder: "E.g. tom@gmail.com",
            name: "email",
            value: "",
          }}
        />
      </Modal>
    </Portal>
  );
};

export default InviteMemberModal;
