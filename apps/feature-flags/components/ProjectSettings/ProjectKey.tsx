import React from "react";
// Components
import { CopyCard } from "@basestack/design-system";
import SettingCard from "../SettingCard";

interface ProjectKeyProps {
  projectKey: string;
}

const ProjectKey = ({ projectKey }: ProjectKeyProps) => {
  return (
    <SettingCard
      title="Project Key"
      description="Here is your project key, which you can use to integrate and access the features in your project."
      hasFooter={false}
    >
      <CopyCard
        maxWidth={400}
        title="Key"
        description={projectKey}
        tooltip={{
          defaultText: "Copy Key",
          successText: "Copied Key to Clipboard",
        }}
      />
    </SettingCard>
  );
};

export default ProjectKey;
