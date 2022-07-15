import React from "react";
import { SettingCard, Table } from "@basestack/design-system";
// Context
import useModals from "hooks/useModals";
import { setIsCreateEnvironmentModalOpen } from "contexts/modals/actions";
// Styles
import { CardList, CardListItem } from "./styles";

const mockMore = [
  { text: "Edit", onClick: () => console.log("") },
  { text: "History", onClick: () => console.log("") },
  { text: "Delete", onClick: () => console.log("") },
];

const mockTableData = {
  headers: ["Environment", "Description", "Show toggle"],
  rows: [
    {
      cols: [
        {
          title: "development",
        },
        {
          title: "Toggles for developers only",
        },
        {
          title: "yes",
        },
      ],
      more: mockMore,
    },
    {
      cols: [
        {
          title: "staging",
        },
        {
          title: "Toggles for Qa’s",
        },
        {
          title: "no",
        },
      ],
      more: mockMore,
    },

    {
      cols: [
        {
          title: "closeprod",
        },
        {
          title: "-",
        },
        {
          title: "no",
        },
      ],
      more: mockMore,
    },

    {
      cols: [
        {
          title: "production",
        },
        {
          title: "Toggles for end users",
        },
        {
          title: "yes",
        },
      ],
      more: mockMore,
    },
  ],
};

const Environments = () => {
  const { dispatch } = useModals();

  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Environments"
          description="Create and edit environments for feature flags and their rules."
          button="Create New Environment"
          onClick={() => dispatch(setIsCreateEnvironmentModalOpen(true))}
        >
          <Table data={mockTableData} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default Environments;
