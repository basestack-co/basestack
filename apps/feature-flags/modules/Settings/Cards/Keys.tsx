import React, { useMemo } from "react";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@basestack/hooks";
// Components
import { Loader, Spinner, Table } from "@basestack/design-system";
import { SettingCard } from "components";
// Libs
import { trpc } from "libs/trpc";
// Utils
import { createTable } from "utils/table";
// Types
import { ProjectSettings } from "types";
import MobileCard from "./MobileCard";

type Props = ProjectSettings;
const KeysCard = ({ project }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.device.max.md);
  const { data, isLoading } = trpc.project.allKeys.useQuery(
    { projectSlug: project.slug },
    { enabled: !!project.id },
  );

  const environments =
    !isLoading && !!data && !!data.keys ? data.keys.environments : [];

  const getTable = useMemo(() => {
    const projectKey = data?.keys?.key;

    return createTable(
      environments,
      ["Name", "Project Key", "Environment Key"],
      (item) => [
        { title: item.name },
        { title: projectKey! },
        { title: item.key! },
      ],
      () => [],
    );
  }, [isLoading, data]);

  const getContent = () => {
    if (isMobile) {
      return environments?.map(({ key, name, id }) => (
        <MobileCard
          key={id}
          title={name}
          data={[
            { icon: "badge", text: id },
            { icon: "key", text: key || "" },
          ]}
        />
      ));
    }

    return <Table data={getTable} />;
  };

  return (
    <SettingCard
      title="API Keys"
      description="API keys can be used with our SDK’s (Javascript, React)."
      hasFooter={false}
    >
      {isLoading || !data ? (
        <Loader>
          <Spinner size="large" />
        </Loader>
      ) : (
        <>{getContent()}</>
      )}
    </SettingCard>
  );
};

export default KeysCard;
