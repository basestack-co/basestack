import React, { useMemo } from "react";
// Components
import { HistoryCard, Loader, Spinner } from "@basestack/design-system";
// Server
import { trpc } from "libs/trpc";
// Utils
import dayjs from "dayjs";
import { getHistoryItemDetails } from "libs/prisma/utils/history";

interface Props {
  projectId: string;
  flagId: string;
}

const HistoryTab = ({ projectId, flagId }: Props) => {
  const { data, isLoading } = trpc.history.all.useQuery(
    {
      flagId,
      projectId,
    },
    { enabled: !!projectId && !!flagId }
  );

  const getHistory = useMemo(() => {
    if (data && !!data.history.length) {
      return data.history.map((item, index, { length }) => {
        const {
          user,
          description,
          slug,
          createdAt,
          type,
          environments,
          avatar,
        } = getHistoryItemDetails(item);

        return (
          <HistoryCard
            key={`history-entry-${item.id}`}
            avatar={avatar}
            userName={user}
            description={description}
            flagName={slug}
            date={dayjs(createdAt).fromNow()}
            environment={environments.map(({ name }) => name).join(", ")}
            type={type}
            hasPaddingTop={index !== 0}
            hasPaddingBottom={index + 1 !== length}
          />
        );
      });
    }

    return <div>No history for this feature flag.</div>;
  }, [data]);

  if (isLoading) {
    return (
      <Loader>
        <Spinner size="large" />
      </Loader>
    );
  }

  return <>{getHistory}</>;
};

export default HistoryTab;
