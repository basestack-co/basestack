// Components
import { Skeleton } from "@basestack/design-system";
import { HistoryCard } from "@basestack/ui";
import { keepPreviousData } from "@tanstack/react-query";
// Utils
import dayjs from "dayjs";
import { useMemo } from "react";
import { getHistoryItemDetails } from "server/db/utils/history";
// Server
import { api } from "utils/trpc/react";

interface Props {
  projectId: string;
  flagId: string;
}

const HistoryTab = ({ projectId, flagId }: Props) => {
  const { data, isLoading } = api.projectHistory.list.useQuery(
    {
      flagId,
      projectId,
      range: [],
      search: null,
    },
    {
      enabled: !!projectId && !!flagId,
      placeholderData: keepPreviousData,
    },
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

        const envs = environments.map(({ name, enabled }) => ({
          name: name ?? "",
          enabled: enabled ?? false,
        }));

        return (
          <HistoryCard
            key={`history-entry-${item.id}`}
            avatar={avatar}
            userName={user}
            description={description}
            flagName={slug}
            date={dayjs(createdAt).fromNow()}
            environments={envs}
            type={type}
            hasPaddingTop={index !== 0}
            hasPaddingBottom={index + 1 !== length}
            hasLeftLine={index + 1 !== length}
          />
        );
      });
    }

    return <div>No history for this feature flag.</div>;
  }, [data]);

  if (isLoading || !data?.history.length) {
    return (
      <Skeleton
        numberOfItems={2}
        gapBetweenItems={24}
        displayInline
        items={[
          { h: 40, w: 40, mr: 20, isRound: true },
          { h: 28, w: 28, mr: 12, isRound: true },
          { h: 47, w: "100%" },
        ]}
        hasShadow={false}
        padding={0}
      />
    );
  }

  return <>{getHistory}</>;
};

export default HistoryTab;
