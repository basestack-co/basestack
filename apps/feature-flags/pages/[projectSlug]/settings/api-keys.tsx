import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import { CardList, CardListItem } from "modules/Settings/styles";
import { SettingCard, Table } from "@basestack/design-system";
// Libs
import { inferQueryOutput } from "libs/trpc";

const mockMore = [
  { text: "Edit", onClick: () => console.log("") },
  { text: "History", onClick: () => console.log("") },
  { text: "Delete", onClick: () => console.log("") },
];

const mockTableData = {
  headers: ["Key", "Environment", "Description"],
  rows: [
    {
      cols: [
        {
          title: "key_dev_8299aa6b",
        },
        {
          title: "development",
        },
        {
          title: "development SDK",
        },
      ],
      more: mockMore,
    },
    {
      cols: [
        {
          title: "key_stag_3400aa6b",
        },
        {
          title: "staging",
        },
        {
          title: "staging SDK",
        },
      ],
      more: mockMore,
    },
    {
      cols: [
        {
          title: "key_close_6002aa6b",
        },
        {
          title: "closeprod",
        },
        {
          title: "closeprod SDK",
        },
      ],
      more: mockMore,
    },
    {
      cols: [
        {
          title: "key_prod_1092aa6b",
        },
        {
          title: "production",
        },
        {
          title: "production SDK",
        },
      ],
      more: mockMore,
    },
  ],
};

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

const ApiKeysPage = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="API Keys"
          description="API keys can be used with our SDK’s (Javascript, React, Go, PHP)."
          button="Create New API Key"
          onClick={() => console.log("save")}
        >
          <Table data={mockTableData} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

ApiKeysPage.Layout = SettingsLayout;

export default ApiKeysPage;
