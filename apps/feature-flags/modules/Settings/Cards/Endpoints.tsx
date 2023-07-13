import React from "react";
// Components
import { SettingCard } from "@basestack/design-system";
// Styles
import { CardListItem } from "../styles";
// Utils
import { getBrowserUrl } from "utils/url";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const EndpointsCard = ({ project }: Props) => {
  return (
    <CardListItem>
      <SettingCard
        title="Endpoints"
        description="API keys can be used with our SDK’s (Javascript, React)."
        hasFooter={false}
      >
        <p>base url: {`${getBrowserUrl()}/api/v1`}</p>
      </SettingCard>
    </CardListItem>
  );
};

export default EndpointsCard;
