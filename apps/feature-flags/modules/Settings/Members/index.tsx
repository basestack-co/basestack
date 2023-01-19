import React from "react";
// Components
import { SettingCard, Table } from "@basestack/design-system";
// Libs
import { RouterOutput } from "libs/trpc";
// Store
import { useStore } from "store";
// Styles
import { CardList, CardListItem } from "../styles";
// Mocks
import { membersTableMock } from "mocks/settings";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const MembersModule = ({ project }: Props) => {
  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen
  );

  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Team members"
          description="Active Members"
          button="Invite Member"
          onClick={() => setInviteMemberModalOpen(true)}
        >
          <Table data={membersTableMock} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default MembersModule;
