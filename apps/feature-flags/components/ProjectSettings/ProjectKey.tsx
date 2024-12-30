import React from "react";
// Locales
import { useTranslations } from "next-intl";
// Components
import { CopyCard } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";

interface ProjectKeyProps {
  projectKey: string;
}

const ProjectKey = ({ projectKey }: ProjectKeyProps) => {
  const t = useTranslations("setting");

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
