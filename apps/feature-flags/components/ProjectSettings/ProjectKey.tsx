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
      description="This is your project key."
      hasFooter={false}
    >
      <CopyCard maxWidth={400} title="Key" description={projectKey} />
    </SettingCard>
  );
};

export default ProjectKey;
