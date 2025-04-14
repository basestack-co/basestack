import React, { useState, useCallback } from "react";
// Theme
import { useTheme } from "styled-components";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { Modal, Tabs } from "@basestack/design-system";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
// Locales
import { useTranslations } from "next-intl";
// Tabs
import MembersTab from "./Tab/Members";
import InvitesTab from "./Tab/Invites";
// Utils
import { TabType, tabPosition } from "./utils";

const ManageTeamModal = () => {
  const t = useTranslations("modal");
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.MEMBERS);
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

  const onRenderTab = useCallback(() => {
    const teamId = payload?.id ?? "";
    switch (selectedTab) {
      case TabType.MEMBERS:
      default:
        return <MembersTab teamId={teamId} />;
      case TabType.INVITES:
        return <InvitesTab teamId={teamId} />;
    }
  }, [payload?.id, selectedTab]);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("team.manage.title", { name: payload?.name ?? "" })}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("team.manage.button.cancel"), onClick: onClose },
        ]}
        onAnimationEnd={onClose}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Tabs
          items={[
            { text: t("team.manage.tab.members.title"), id: TabType.MEMBERS },
            { text: t("team.manage.tab.invites.title"), id: TabType.INVITES },
          ]}
          onSelect={(tab: string) => setSelectedTab(tab as TabType)}
          sliderPosition={tabPosition[selectedTab]}
          mb={theme.spacing.s6}
        />
        {onRenderTab()}
      </Modal>
    </Portal>
  );
};

export default ManageTeamModal;
