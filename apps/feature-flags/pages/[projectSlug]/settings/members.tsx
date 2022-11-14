import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import { CardList, CardListItem } from "modules/Settings/styles";
import { SettingCard, Table } from "@basestack/design-system";
// Libs
import { inferQueryOutput } from "libs/trpc";
// Context
import useModals from "hooks/useModals";
import { seIsInviteMemberModalOpen } from "contexts/modals/actions";

const mockMore = [
  { text: "Edit", onClick: () => console.log("") },
  { text: "History", onClick: () => console.log("") },
  { text: "Delete", onClick: () => console.log("") },
];

const mockTableData = {
  headers: ["Name", "Email", "Role"],
  rows: [
    {
      cols: [
        {
          image: {
            userName: "Marta",
            src: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          title: "Marta",
        },
        {
          title: "Marta@gmail.com",
        },
        {
          title: "Admin",
        },
      ],
      more: mockMore,
    },
    {
      cols: [
        {
          image: {
            userName: "Pedro",
            src: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          title: "Pedro",
        },
        {
          title: "pedro_dev@gmail.com",
        },
        {
          title: "developer",
        },
      ],
      more: mockMore,
    },
    {
      cols: [
        {
          image: {
            userName: "Daniel",
            src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          title: "Daniel",
        },
        {
          title: "daniel_ninja_dev@gmail.com",
        },
        {
          title: "developer",
        },
      ],
      more: mockMore,
    },
    {
      cols: [
        {
          image: {
            userName: "Joana",
            src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
          title: "Joana",
        },
        {
          title: "joana_mac@gmail.com",
        },
        {
          title: "QA",
        },
      ],
      more: mockMore,
    },
  ],
};

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

const MembersPage = ({ project }: Props) => {
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
          <Table data={mockTableData} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

MembersPage.Layout = SettingsLayout;

export default MembersPage;
