import React, { useMemo } from "react";
// Components
import {
  ButtonVariant,
  SettingCard,
  Skeleton,
  Table,
  Loader,
} from "@basestack/design-system";
// Server
import { trpc, RouterOutput } from "libs/trpc";
// Store
import { useStore } from "store";
// Styles
import { CardList, CardListItem } from "../styles";
// Types
import { Row } from "@basestack/design-system/organisms/Table/types";
import { Environment } from "@prisma/client";
import { HistoryAction } from "types/history";
// Utils
import dayjs from "dayjs";

export const headers = ["Environment", "Slug", "Description", "Created At"];

export interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const EnvironmentsModule = ({ project }: Props) => {
  const trpcContext = trpc.useContext();
  const setCreateEnvironmentModalOpen = useStore(
    (state) => state.setCreateEnvironmentModalOpen
  );
  const setUpdateEnvironmentModalOpen = useStore(
    (state) => state.setUpdateEnvironmentModalOpen
  );

  const { data, isLoading } = trpc.environment.all.useQuery(
    { projectId: project?.id! },
    { enabled: !!project?.id }
  );

  const deleteEnvironment = trpc.environment.delete.useMutation();

  const onHandleEdit = (environmentId: string) => {
    if (project) {
      setUpdateEnvironmentModalOpen({
        isOpen: true,
        data: {
          environment: { id: environmentId },
          project,
        },
      });
    }
  };

  const onHandleCreate = () => {
    if (project) {
      setCreateEnvironmentModalOpen({ isOpen: true, data: { project } });
    }
  };

  const onHandleDelete = async (environmentId: string) => {
    if (project) {
      await deleteEnvironment.mutate(
        {
          environmentId,
          projectId: project.id,
        },
        {
          onSuccess: async (result) => {
            // Get all the environments by project on the cache
            const prev = trpcContext.environment.all.getData({
              projectId: project.id,
            });

            if (prev && prev.environments) {
              const environments = prev.environments.filter(
                ({ id }) => id !== result.environment.id
              );

              // Update the cache with the new data
              trpcContext.environment.all.setData(
                { projectId: project.id },
                {
                  environments,
                }
              );
            }
          },
        }
      );
    }
  };

  const getTable = useMemo(() => {
    if (!isLoading && !!data) {
      const rows = data.environments.map(
        ({
          name,
          slug,
          description,
          id,
          createdAt,
          isDefault,
        }: Environment) => {
          const row: Row = {
            cols: [
              { title: name },
              { title: slug },
              { title: description ?? "" },
              { title: dayjs(createdAt).fromNow() },
            ],
            more: [
              { icon: "edit", text: "Edit", onClick: () => onHandleEdit(id) },
              {
                icon: "delete",
                text: "Delete",
                variant: ButtonVariant.Danger,
                onClick: () => onHandleDelete(id),
                isVisible: !isDefault,
              },
            ],
          };
          return row;
        }
      );

      return { headers, rows };
    }

    return { headers, rows: [] };
  }, [isLoading, data, onHandleEdit, onHandleDelete]);

  if (isLoading || !data) {
    return (
      <Loader>
        <Skeleton
          items={[
            { h: 24, w: "15%", mb: 10 },
            { h: 18, w: "40%", mb: 20 },
            { h: 100, w: "100%", mb: 20 },
            { h: 1, w: "100%", mb: 16 },
            { h: 36, w: 120, mb: 0, ml: "auto" },
          ]}
          padding={20}
        />
      </Loader>
    );
  }

  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Environments"
          description="Create and edit environments for feature flags and their rules."
          button="Create New Environment"
          onClick={onHandleCreate}
        >
          <Table data={getTable} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default EnvironmentsModule;
