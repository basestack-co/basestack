import React, { useMemo } from "react";
// Components
import { HistoryCard, Loader, Spinner } from "@basestack/design-system";
// Server
import { trpc } from "libs/trpc";
// Types
import { HistoryAction, HistoryPayload } from "types/history";
// Utils
import { getValue } from "@basestack/utils";
import dayjs from "dayjs";
import { Type } from "@basestack/design-system/organisms/HistoryCard/types";

interface Props {
  projectId: string;
  flagSlug: string;
}

const getType: { [id: string]: Type } = {
  [HistoryAction.createProject]: "created",
  [HistoryAction.updateProject]: "edited",
  [HistoryAction.createEnvironment]: "created",
  [HistoryAction.updateEnvironment]: "edited",
  [HistoryAction.deleteEnvironment]: "deleted",
  [HistoryAction.createFlag]: "created",
  [HistoryAction.updateFlag]: "edited",
  [HistoryAction.deleteFlag]: "deleted",
};

const getDescription: { [id: string]: string } = {
  [HistoryAction.createProject]: "created the project",
  [HistoryAction.updateProject]: "updated the project",
  [HistoryAction.createEnvironment]: "created the environment",
  [HistoryAction.updateEnvironment]: "updated the environment",
  [HistoryAction.deleteEnvironment]: "deleted the environment",
  [HistoryAction.createFlag]: "created the flag",
  [HistoryAction.updateFlag]: "updated the flag",
  [HistoryAction.deleteFlag]: "deleted the flag",
};

const HistoryTab = ({ projectId, flagSlug }: Props) => {
  const { data, isLoading } = trpc.history.all.useQuery(
    {
      flagSlug,
      projectId,
    },
    { enabled: !!projectId && !!flagSlug }
  );

  console.log("history tab data", data);

  const getHistory = useMemo(() => {
    if (data && !!data.history.length) {
      return data.history.map(
        ({ id, action, payload, createdAt }, index, { length }) => {
          return (
            <HistoryCard
              key={`history-entry-${id}`}
              userName={getValue(payload, "user.name", "")!}
              description={`${getDescription[action] ?? ""}`}
              flagName={getValue(payload, "flag.slug", "")!}
              date={dayjs(createdAt).fromNow()}
              environment="Development"
              type={`${getType[action] ?? "created"}`}
              hasPaddingTop={index !== 0 && index !== length - 1}
            />
          );
        }
      );
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

  return (
    <>
      {getHistory}

      {/*
      <HistoryCard
        userName="Vitor Amaral"
        description="deleted the flag"
        flagName="user_image"
        date="30 min ago"
        environment="Development"
        type="deleted"
        hasPaddingTop={false}
      />
      <HistoryCard
        userName="Joana Lopes"
        description="toggled off"
        flagName="user_image"
        date="1 hour ago"
        environment="Development"
        type="toggledOff"
      />
      <HistoryCard
        userName="Flávio Amaral"
        description="changed the description of"
        flagName="user_image"
        date="10 days ago"
        environment="Development"
        type="edited"
      />
      <HistoryCard
        userName="Eduardo Dev"
        description="renamed the flag"
        flagName="user_photo"
        date="30 days ago"
        environment="Development"
        type="edited"
      />
      <HistoryCard
        userName="Joe Fleet"
        description="created the flag"
        flagName="user_photo"
        date="10 December 2022"
        environment="Development"
        type="created"
        hasPaddingBottom={false}
      />
      */}
    </>
  );
};

export default HistoryTab;
