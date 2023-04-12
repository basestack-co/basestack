import React, { useMemo } from "react";
// Components
import { Loader, SettingCard, Spinner, Table } from "@basestack/design-system";
// Libs
import { RouterOutput, trpc } from "libs/trpc";
// Styles
import { CardListItem } from "../styles";
// Utils
import { createTable } from "utils/table";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const KeysCard = ({ project }: Props) => {
  const { data, isLoading } = trpc.project.allKeys.useQuery(
    { projectSlug: project?.slug! },
    { enabled: !!project?.id }
  );

  const getTable = useMemo(() => {
    const projectKey = data?.keys?.key;

    return createTable(
      !isLoading && !!data && !!data.keys ? data.keys.environments : [],
      ["Name", "Project Key", "Environment Key"],
      (item) => [
        { title: item.name },
        { title: projectKey! },
        { title: item.key! },
      ],
      (item) => [
        {
          icon: "content_copy",
          text: "Copy",
          onClick: () => console.log("delete"),
        },
      ]
    );
  }, [isLoading, data]);

  return (
    <CardListItem>
      <SettingCard
        title="API KeysCard"
        description="API keys can be used with our SDK’s (Javascript, React)."
        hasFooter={false}
      >
        {isLoading || !data ? (
          <Loader>
            <Spinner size="large" />
          </Loader>
        ) : (
          <Table data={getTable} />
        )}
      </SettingCard>
    </CardListItem>
  );
};

export default KeysCard;
