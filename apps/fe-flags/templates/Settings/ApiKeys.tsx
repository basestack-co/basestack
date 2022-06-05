import React from "react";
import { SettingCard, Table } from "design-system";
import { CardList, CardListItem } from "./styles";

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

const ApiKeys = () => {
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

export default ApiKeys;
