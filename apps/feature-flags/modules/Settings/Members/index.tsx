import React from "react";
// Components
import { SettingCard, Table } from "@basestack/design-system";
// Libs
import { inferQueryOutput } from "libs/trpc";
// Context
import useModals from "hooks/useModals";
import { seIsInviteMemberModalOpen } from "contexts/modals/actions";
// Styles
import { CardList, CardListItem } from "../styles";
// Mocks
import { membersTableMock } from "mocks/settings";

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

const MembersModule = ({ project }: Props) => {
  const {
    dispatch,
    state: { isDemoModalOpen: isModalOpen },
  } = useModals();

  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Team members"
          description="Active Members"
          button="Invite Member"
          onClick={() => dispatch(seIsInviteMemberModalOpen(true))}
        >
          <Table data={membersTableMock} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default MembersModule;
