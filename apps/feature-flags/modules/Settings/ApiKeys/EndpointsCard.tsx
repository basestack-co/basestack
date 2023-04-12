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

const EndpointsCard = ({ project }: Props) => {
  return (
    <CardListItem>
      <SettingCard
        title="EndpointsCard"
        description="API keys can be used with our SDK’s (Javascript, React)."
        hasFooter={false}
      >
        <p>list here</p>
      </SettingCard>
    </CardListItem>
  );
};

export default EndpointsCard;
