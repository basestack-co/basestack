import React, { useMemo, useCallback } from "react";
// Components
import { SettingCard, Table } from "@basestack/design-system";
// Libs
import { RouterOutput } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Mocks
import { apiKeysTableMock } from "__mocks__/settings";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const Endpoints = ({ project }: Props) => {
  return (
    <CardListItem>
      <SettingCard
        title="Endpoints"
        description="API keys can be used with our SDK’s (Javascript, React)."
        button="Create New API Key"
        onClick={() => console.log("save")}
      >
        <Table data={apiKeysTableMock} />
      </SettingCard>
    </CardListItem>
  );
};

export default Endpoints;
