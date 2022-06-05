import React, { useCallback } from "react";
import Portal from "design-system/global/Portal";
import { useDispatch, useSelector } from "react-redux";
import { getIsInviteMemberModalOpen } from "store/selectors/modals";
import { AppDispatch } from "store";
import { setInviteMemberModalOpen } from "store/slices/modals";
import { Modal, InputGroup } from "design-system";

const InviteMemberModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector(getIsInviteMemberModalOpen);

  const onClose = useCallback(() => {
    dispatch(setInviteMemberModalOpen(false));
  }, [dispatch]);

  return (
    <Portal selector="#portal">
      <Modal
        title="Invite Team Member"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { text: "Close", onClick: onClose },
          { text: "Send Invite", onClick: () => console.log("invite") },
        ]}
      >
        <InputGroup
          title="Email"
          inputProps={{
            onChange: (text) => console.log("text = ", text),
            placeholder: "E.g. tom@gmail.com",
          }}
        />
      </Modal>
    </Portal>
  );
};

export default InviteMemberModal;
