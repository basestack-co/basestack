import React, { useMemo, useCallback } from "react";
// Components
import {
  ButtonVariant,
  Loader,
  SettingCard,
  Skeleton,
  Spinner,
  Table,
} from "@basestack/design-system";
// Server
import { trpc, RouterOutput } from "libs/trpc";
// Store
import { useStore } from "store";
// Utils
import dayjs from "dayjs";
import { createTable } from "utils/table";

export interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const EnvironmentsCard = ({ project }: Props) => {
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

  const getTable = useMemo(
    () =>
      createTable(
        !isLoading && !!data ? data.environments : [],
        ["Environment", "Slug", "Description", "Created At"],
        (item) => [
          { title: item.name },
          { title: item.slug },
          { title: item.description ?? "" },
          { title: dayjs(item.createdAt).fromNow() },
        ],
        (item) => [
          { icon: "edit", text: "Edit", onClick: () => onHandleEdit(item.id) },
          {
            icon: "delete",
            text: "Delete",
            variant: ButtonVariant.Danger,
            onClick: () => onHandleDelete(item.id),
            isDisabled: !!item.isDefault,
          },
        ]
      ),

    [isLoading, data, onHandleEdit, onHandleDelete]
  );

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
    <SettingCard
      title="Environments"
      description="Create and edit environments for feature flags and their rules."
      button="Create New Environment"
      onClick={onHandleCreate}
    >
      {isLoading || !data ? (
        <Loader>
          <Spinner size="large" />
        </Loader>
      ) : (
        <Table data={getTable} />
      )}
    </SettingCard>
  );
};

export default EnvironmentsCard;
