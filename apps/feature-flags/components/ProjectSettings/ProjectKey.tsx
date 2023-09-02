import React from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { CopyCard } from "@basestack/design-system";
import SettingCard from "../SettingCard";

interface ProjectKeyProps {
  projectKey: string;
}

const ProjectKey = ({ projectKey }: ProjectKeyProps) => {
  const { t } = useTranslation("settings");

  return (
    <SettingCard
      title={t("general.project-key.title")}
      description={t("general.project-key.description")}
      hasFooter={false}
    >
      <CopyCard
        maxWidth={400}
        title={t("general.project-key.copy.title")}
        description={projectKey}
        tooltip={{
          defaultText: t("common.copy.key.default"),
          successText: t("common.copy.key.success"),
        }}
      />
    </SettingCard>
  );
};

export default ProjectKey;
