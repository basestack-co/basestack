import React from "react";
import useTranslation from "next-translate/useTranslation";
import dayjs from "dayjs";
import { Environment, HistoryAction } from "types";
import { HistoryItemDetails, typeMap } from "libs/prisma/utils/history";
import HistoryCard from "../HistoryCard";
import Loading from "./Loading";
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
  const { t } = useTranslation("modals");

  if (isLoading) {
    return <Loading />;
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
  );
};

export default ActivityList;
