import React, { useMemo } from "react";
// Components
import { ButtonVariant, SettingCard, Table } from "@basestack/design-system";
// Server
import { trpc, RouterOutput } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";
// Context
import useModals from "hooks/useModals";
import {
  setIsCreateEnvironmentModalOpen,
  setIsUpdateEnvironmentModalOpen,
} from "contexts/modals/actions";
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
  const { onCreateHistory } = useCreateApiHistory();
  const { dispatch } = useModals();

  const { data, isLoading } = trpc.environment.all.useQuery(
    { projectSlug: project?.slug! },
    { enabled: !!project?.slug }
  );

  const deleteEnvironment = trpc.environment.delete.useMutation();

  const onHandleEdit = (environmentId: string) => {
    if (project) {
      dispatch(
        setIsUpdateEnvironmentModalOpen({
          isOpen: true,
          data: { environment: { id: environmentId }, project },
        })
      );
    }
  };

  const onHandleCreate = () => {
    if (project) {
      dispatch(
        setIsCreateEnvironmentModalOpen({
          isOpen: true,
          data: { project },
        })
      );
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
              projectSlug: project.slug,
            });

            if (prev && prev.environments) {
              const environments = prev.environments.filter(
                ({ id }) => id !== result.environment.id
              );

              // Update the cache with the new data
              trpcContext.environment.all.setData(
                { projectSlug: project.slug },
                {
                  environments,
                }
              );
            }

            await onCreateHistory(HistoryAction.deleteEnvironment, {
              projectId: project.id,
              payload: {
                environment: {
                  id: result.environment.id,
                  name: result.environment.name,
                  slug: result.environment.slug,
                  description: result.environment.description ?? "",
                },
              },
            });
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
          { name, slug, description, id, createdAt }: Environment
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
  }, [isLoading, data]);

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
