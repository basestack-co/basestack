import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { Tabs, Modal } from "@basestack/design-system";
// Context
import useModals from "hooks/useModals";
import { setIstEditFlagModalOpen } from "contexts/modals/actions";
// Containers
import Core from "./Core";
import Advanced from "./Advanced";
import History from "./History";

const EditFlagModal = () => {
  const theme = useTheme();
  const {
    dispatch,
    state: { isEditFlagModalOpen: isModalOpen },
  } = useModals();

  const [selectedTab, setSelectedTab] = useState("core");

  const onClose = useCallback(() => {
    dispatch(setIstEditFlagModalOpen(false));
  }, [dispatch]);

  const activeTab = {
    core: 0,
    advanced: 1,
    history: 2,
  };

  return (
    <Portal selector="#portal">
      <Modal
        title="Edit Flag"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { text: "Close", onClick: onClose },
          { text: "Save", onClick: () => console.log("create") },
        ]}
      >
        <Tabs
          items={[{ text: "Core" }, { text: "Advanced" }, { text: "History" }]}
          onSelect={(tab) => setSelectedTab(tab.toLowerCase())}
          sliderPosition={activeTab[selectedTab]}
          mb={theme.spacing.s6}
        />
        {selectedTab === "core" && <Core />}
        {selectedTab === "advanced" && <Advanced />}
        {selectedTab === "history" && <History />}
      </Modal>
    </Portal>
  );
};

export default EditFlagModal;
