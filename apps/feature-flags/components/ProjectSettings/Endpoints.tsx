import React from "react";
// Components
import { Text } from "@basestack/design-system";
import SettingCard from "../SettingCard";
// Utils
import { getBrowserUrl } from "utils/url";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const EndpointsCard = ({ project }: Props) => {
  return (
    <SettingCard
      title="Endpoints"
      description="API keys can be used with our SDK’s (Javascript, React)."
      hasFooter={false}
    >
      <Text>Base url: {`${getBrowserUrl()}/api/v1`}</Text>
    </SettingCard>
  );
};

export default EndpointsCard;