import React, { useMemo } from "react";
// Components
import { ButtonVariant, SettingCard, Table } from "@basestack/design-system";
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
        environment: { id: environmentId },
        project,
      });
    }
  };

  const onHandleCreate = () => {
    if (project) {
      setCreateEnvironmentModalOpen({ project });
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
      const rows = data.environments.reduce(
        (
          acc: Row[],
          { name, slug, description, id, createdAt, isDefault }: Environment
        ) => {
          return [
            ...acc,
            {
              cols: [
                {
                  title: name,
                },
                {
                  title: slug,
                },
                {
                  title: description,
                },
                {
                  title: dayjs(createdAt).fromNow(),
                },
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
            },
          ] as Row[];
        },
        [] as Row[]
      );

      return { headers, rows };
    }

    return { headers, rows: [] };
  }, [isLoading, data, onHandleEdit, onHandleDelete]);

  if (isLoading || !data) {
    return <div>isLoading...</div>;
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
