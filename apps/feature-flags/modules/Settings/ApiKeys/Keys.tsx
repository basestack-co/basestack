import React, { useMemo, useCallback } from "react";
// Components
import {
  ButtonVariant,
  Loader,
  SettingCard,
  Spinner,
  Table,
} from "@basestack/design-system";
// Libs
import { RouterOutput, trpc } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Types
import { Row } from "@basestack/design-system/organisms/Table/types";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

export const headers = ["Name", "Project Key", "Environment Key"];

const Keys = ({ project }: Props) => {
  const { data, isLoading } = trpc.project.allKeys.useQuery(
    { projectSlug: project?.slug! },
    { enabled: !!project?.id }
  );

  const getTable = useMemo(() => {
    if (!isLoading && !!data && !!data.keys) {
      const projectKey = data.keys.key;

      const rows = data.keys.environments.map((environment) => {
        const row: Row = {
          cols: [
            { title: environment.name },
            { title: projectKey! },
            { title: environment.key! },
          ],
          more: [
            {
              icon: "content_copy",
              text: "Copy",
              onClick: () => console.log("delete"),
            },
          ],
        };
        return row;
      });

      return { headers, rows };
    }

    return { headers, rows: [] };
  }, [isLoading, data]);
  if (isLoading || !data) {
    return (
      <Loader>
        <Spinner size="large" />
      </Loader>
    );
  }

  return (
    <CardListItem>
      <SettingCard
        title="API Keys"
        description="API keys can be used with our SDK’s (Javascript, React)."
        hasFooter={false}
      >
        <Table data={getTable} />
      </SettingCard>
    </CardListItem>
  );
};

export default Keys;
