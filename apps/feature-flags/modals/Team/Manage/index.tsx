import React from "react";
import Portal from "@basestack/design-system/global/Portal";
import { Modal } from "@basestack/design-system";
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
import { useTranslations } from "next-intl";
import Members from "./Members";

const ManageTeamModal = () => {
  const t = useTranslations("modal");
  const [
    isModalOpen,
    setManageTeamModalOpen,
    payload,
    closeModalsOnClickOutside,
  ] = useStore(
    useShallow((state) => [
      state.isManageTeamModalOpen,
      state.setManageTeamModalOpen,
      state.teamModalPayload,
      state.closeModalsOnClickOutside,
    ]),
  );

  const onClose = () => setManageTeamModalOpen({ isOpen: false });

  return (
    <Portal selector="#portal">
      <Modal
        title={t("team.manage.title", { name: payload?.name ?? "" })}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        onAnimationEnd={onClose}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Members teamId={payload?.id ?? ""} />
      </Modal>
    </Portal>
  );
};

export default ManageTeamModal;
