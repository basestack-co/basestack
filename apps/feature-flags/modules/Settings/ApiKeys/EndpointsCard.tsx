import React from "react";
// Components
import { SettingCard } from "@basestack/design-system";
// Libs
import { RouterOutput } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Utils
import { getBaseUrl } from "utils/url";

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
        <p>base url: {getBaseUrl()}</p>
      </SettingCard>
    </CardListItem>
  );
};

export default EndpointsCard;
