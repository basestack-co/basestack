import { Modal } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
import { useTranslations } from "next-intl";
import React from "react";
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
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

  const onClose = () =>
    setManageTeamModalOpen({
      isOpen: false,
      data: {
        id: "",
        name: payload?.name ?? "",
      },
    });

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
