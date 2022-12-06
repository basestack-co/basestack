import React from "react";
// Components
import { SettingCard, Table } from "@basestack/design-system";
// Libs
import { RouterOutput } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Mocks
import { apiKeysTableMock } from "mocks/settings";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const ApiKeysModule = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="API Keys"
          description="API keys can be used with our SDK’s (Javascript, React, Go, PHP)."
          button="Create New API Key"
          onClick={() => console.log("save")}
        >
          <Table data={apiKeysTableMock} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default ApiKeysModule;
