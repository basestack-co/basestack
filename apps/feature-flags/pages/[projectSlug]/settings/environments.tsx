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
import { setIsCreateEnvironmentModalOpen } from "contexts/modals/actions";

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

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

const EnvironmentsPage = ({ project }: Props) => {
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

EnvironmentsPage.Layout = SettingsLayout;

export default EnvironmentsPage;
