import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useTheme } from "styled-components";
import dayjs from "dayjs";
import { Card } from "@basestack/design-system";
import { HistoryAction } from "types";
import { trpc } from "libs/trpc";
import { typeMap } from "libs/prisma/utils/history";
import HistoryCard from "../HistoryCard";
import Loading from "./Loading";
import { List, ListItem } from "./styles";

const ActivityList = () => {
  const theme = useTheme();
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const projectSlug = router.query.projectSlug as string;

  const project = useMemo(() => {
    if (projectSlug) {
      const cache = trpcContext.project.all.getData();

      return ((cache && cache.projects) || []).find(
        (project) => project.slug === projectSlug,
      );
    }

    return null;
  }, [projectSlug, trpcContext]);

  const { data, isLoading } = trpc.history.all.useQuery(
    { flagId: null, projectId: project?.id as string },
    { enabled: !!project?.id, keepPreviousData: true },
  );

  if (isLoading) {
    return Loading;
  }

  return (
    <Card padding={theme.spacing.s5}>
      <List>
        {data &&
          !!data.history.length &&
          data.history.map((item, index, { length }) => {
            const { user, flag } = item.payload;
            const type = typeMap[item.action] ?? "created";

            const envs = flag?.environments?.map(({ name, enabled }) => ({
              name: name ?? "",
              enabled: enabled ?? false,
            }));

            const isCreatedProject =
              item.action === HistoryAction.createProject;

            return (
              <ListItem key={`history-entry-${item.id}`}>
                <HistoryCard
                  avatar={user.avatar}
                  userName={user.name}
                  description={
                    isCreatedProject
                      ? "created the project"
                      : `${type} the flag`
                  }
                  flagName={isCreatedProject ? projectSlug : flag?.slug}
                  date={dayjs(item.createdAt).fromNow()}
                  environments={!!envs ? envs : []}
                  type={type}
                  hasPaddingBottom={index + 1 !== length}
                  hasPaddingTop={index > 0}
                  hasLeftLine={index + 1 !== length}
                />
              </ListItem>
            );
          })}
      </List>
    </Card>
  );
};

export default ActivityList;
