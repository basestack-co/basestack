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
import { trpc } from "libs/trpc";
// Store
import { useStore } from "store";
// Utils
import dayjs from "dayjs";
import { createTable } from "utils/table";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;
const EnvironmentsCard = ({ project }: Props) => {
  const trpcContext = trpc.useContext();
  const setCreateEnvironmentModalOpen = useStore(
    (state) => state.setCreateEnvironmentModalOpen
  );
  const setUpdateEnvironmentModalOpen = useStore(
    (state) => state.setUpdateEnvironmentModalOpen
  );

  const projectId = project?.id ?? "";

  const { data, isLoading } = trpc.environment.all.useQuery(
    { projectId },
    { enabled: !!projectId }
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
            projectId,
          },
          {
            onSuccess: async (result) => {
              // Get all the environments by project on the cache
              const prev = trpcContext.environment.all.getData({
                projectId,
              });

              if (prev && prev.environments) {
                const environments = prev.environments.filter(
                  ({ id }) => id !== result.environment.id
                );

                // Update the cache with the new data
                trpcContext.environment.all.setData(
                  { projectId },
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
