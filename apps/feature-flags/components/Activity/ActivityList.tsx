// Components
import { Empty, Skeleton } from "@basestack/design-system";
import { HistoryCard } from "@basestack/ui";
// Utils
import dayjs from "dayjs";
// Locales
import { useTranslations } from "next-intl";
import React from "react";
// Server
import { type HistoryItemDetails, typeMap } from "server/db/utils/history";
// Styles
import { useTheme } from "styled-components";
// Types
import { type Environment, HistoryAction } from "types";
import { List, ListItem } from "./styles";

export interface History extends HistoryItemDetails {
  id: string;
  action: string;
  payload: {
    flag: { slug: string; environments: Environment[] };
    user: { avatar: string; name: string };
  };
}

export type ActivityListData = { history: History[] };

export interface ActivityListProps {
  projectSlug: string;
  isLoading: boolean;
  data: ActivityListData;
}

const ActivityList = ({ data, isLoading, projectSlug }: ActivityListProps) => {
  const theme = useTheme();
  const t = useTranslations("modal");

  if (isLoading) {
    return (
      <Skeleton
        numberOfItems={5}
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

  if (!data.history.length) {
    return (
      <Empty
        py={theme.spacing.s6}
        iconName="query_stats"
        title={t("activity.empty.title")}
        description={t("activity.empty.description")}
      />
    );
  }

  return (
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

          const isCreatedProject = item.action === HistoryAction.createProject;

          return (
            <ListItem key={`history-entry-${item.id}`}>
              <HistoryCard
                avatar={user.avatar}
                userName={user.name}
                description={
                  isCreatedProject
                    ? t("activity.card.description.project")
                    : t("activity.card.description.flag", { type })
                }
                flagName={isCreatedProject ? projectSlug : flag?.slug}
                date={dayjs(item.createdAt).fromNow()}
                environments={envs ? envs : []}
                type={type}
                hasPaddingBottom={index + 1 !== length}
                hasPaddingTop={index > 0}
                hasLeftLine={index + 1 !== length}
              />
            </ListItem>
          );
        })}
    </List>
  );
};

export default ActivityList;
