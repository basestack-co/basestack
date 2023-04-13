import React from "react";
// Components
import { SettingCard } from "@basestack/design-system";
// Styles
import { CardListItem } from "../styles";
// Utils
import { getBaseUrl } from "utils/url";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

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
