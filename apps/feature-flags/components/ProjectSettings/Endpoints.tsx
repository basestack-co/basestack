import React from "react";
// Components
import { CopyCard } from "@basestack/design-system";
import SettingCard from "../SettingCard";
// Utils
import { getBrowserUrl } from "utils/helpers/url";
const EndpointsCard = () => {
  return (
    <SettingCard
      title="Endpoints"
      description="Endpoints are essential for the SDKs to access and interact with features."
      hasFooter={false}
    >
      <CopyCard
        maxWidth={400}
        title="Base Url"
        description={`${getBrowserUrl()}/api/v1`}
        tooltip={{
          defaultText: "Copy URL",
          successText: "Copied URL to Clipboard",
        }}
      />
    </SettingCard>
  );
};

export default EndpointsCard;
