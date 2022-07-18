import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { Tabs, Modal } from "@basestack/design-system";
// Context
import useModals from "hooks/useModals";
import { seIstCreateFlagModalOpen } from "contexts/modals/actions";
// Containers
import Core from "./Core";
import Advanced from "./Advanced";

const CreateFlagModal = () => {
  const theme = useTheme();
  const {
    dispatch,
    state: { isCreateFlagModalOpen: isModalOpen },
  } = useModals();

  const [selectedTab, setSelectedTab] = useState("core");

  const onClose = useCallback(() => {
    dispatch(seIstCreateFlagModalOpen(false));
  }, [dispatch]);

  return (
    <Portal selector="#portal">
      <Modal
        title="Create Flag"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { text: "Close", onClick: onClose },
          { text: "Create", onClick: () => console.log("create") },
        ]}
      >
        <Tabs
          items={[{ text: "Core" }, { text: "Advanced" }]}
          onSelect={(tab) => setSelectedTab(tab.toLowerCase())}
          sliderPosition={selectedTab === "advanced" ? 1 : 0}
          mb={theme.spacing.s6}
        />
        {selectedTab === "core" ? <Core /> : <Advanced />}
      </Modal>
    </Portal>
  );
};

export default CreateFlagModal;
