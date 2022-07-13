import React from "react";
import { SettingCard, Table } from "@basestack/design-system";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { setCreateEnvironmentModalOpen } from "store/slices/modals";
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
  const dispatch = useDispatch<AppDispatch>();

  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Environments"
          description="Create and edit environments for feature flags and their rules."
          button="Create New Environment"
          onClick={() => dispatch(setCreateEnvironmentModalOpen(true))}
        >
          <Table data={mockTableData} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default Environments;
