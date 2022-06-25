import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import Portal from "design-system/global/Portal";
import { useDispatch, useSelector } from "react-redux";
import { getIsCreateFlagModalOpen } from "store/selectors/modals";
import { AppDispatch } from "store";
import { setCreateFlagModalOpen } from "store/slices/modals";
import { Tabs, Modal } from "design-system";
import Core from "./Core";
import Advanced from "./Advanced";

const CreateFlagModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector(getIsCreateFlagModalOpen);
  const [selectedTab, setSelectedTab] = useState("core");

  const onClose = useCallback(() => {
    dispatch(setCreateFlagModalOpen(false));
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
