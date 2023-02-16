import React, { useMemo, useCallback } from "react";
// Components
import {
  ButtonVariant,
  Loader,
  SettingCard,
  Spinner,
  Table,
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

  const onHandleEdit = useCallback(
    (environmentId: string) => {
      if (project) {
        setUpdateEnvironmentModalOpen({
          isOpen: true,
          data: {
            environment: { id: environmentId },
            project,
          },
        });
      }
    },
    [project, setUpdateEnvironmentModalOpen]
  );

  const onHandleCreate = () => {
    if (project) {
      setCreateEnvironmentModalOpen({ isOpen: true, data: { project } });
    }
  };

  const onHandleDelete = useCallback(
    async (environmentId: string) => {
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
    },
    [project, deleteEnvironment, trpcContext.environment.all]
  );

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
        <Spinner size="large" />
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
