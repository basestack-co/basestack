import React, { useMemo } from "react";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@basestack/hooks";
// Components
import { Loader, Skeleton, Table } from "@basestack/design-system";
import SettingCard from "../SettingCard";
import MobileCard from "../MobileCard";
// Libs
import { trpc } from "libs/trpc";
// Utils
import { createTable } from "utils/table";
// Types
import { ProjectSettings } from "types";

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
    return createTable(
      environments,
      ["Name", "Environment Key"],
      (item) => [{ title: item.name }, { title: item.key!, hideText: true }],
      () => [],
      "test",
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
          <Skeleton
            items={[
              { h: 25, w: "15%", mb: 10 },
              { h: 1, w: "100%", mb: 10 },
              { h: 50, w: "100%", mb: 10 },
              { h: 50, w: "100%" },
            ]}
            padding={20}
            hasShadow={false}
          />
        </Loader>
      ) : (
        <>{getContent()}</>
      )}
    </SettingCard>
  );
};

export default KeysCard;
