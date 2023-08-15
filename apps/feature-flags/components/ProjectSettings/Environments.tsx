import React, { useMemo, useCallback } from "react";
import { useTheme } from "styled-components";
import { useMedia } from "react-use";
// Components
import {
  ButtonVariant,
  Loader,
  Skeleton,
  Table,
} from "@basestack/design-system";
import SettingCard from "../SettingCard";
import MobileCard from "../MobileCard";
// Server
import { trpc } from "libs/trpc";
// Store
import { useStore } from "store";
// Utils
import dayjs from "dayjs";
import { createTable } from "utils/helpers/table";
// Types
import { ProjectSettings } from "types";
import { Role } from "@prisma/client";

type Props = ProjectSettings;
const EnvironmentsCard = ({ project }: Props) => {
  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.md, false);
  const trpcContext = trpc.useContext();
  const setCreateEnvironmentModalOpen = useStore(
    (state) => state.setCreateEnvironmentModalOpen,
  );
  const setUpdateEnvironmentModalOpen = useStore(
    (state) => state.setUpdateEnvironmentModalOpen,
  );
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);

  const { data, isLoading } = trpc.environment.all.useQuery(
    { projectId: project.id },
    { enabled: !!project.id },
  );

  const deleteEnvironment = trpc.environment.delete.useMutation();
  const isCurrentUserAdmin = project.role === Role.ADMIN;
  const environments = useMemo(
    () => (!isLoading && !!data ? data.environments : []),
    [isLoading, data],
  );

  const onHandleEdit = useCallback(
    (environmentId: string) => {
      setUpdateEnvironmentModalOpen({
        isOpen: true,
        data: {
          environment: { id: environmentId },
          project,
        },
      });
    },
    [project, setUpdateEnvironmentModalOpen],
  );

  const onHandleCreate = () => {
    if (project) {
      setCreateEnvironmentModalOpen({ isOpen: true, data: { project } });
    }
  };

  const onHandleDelete = useCallback(
    async (environmentId: string) => {
      deleteEnvironment.mutate(
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
                ({ id }) => id !== result.environment.id,
              );

              // Update the cache with the new data
              trpcContext.environment.all.setData(
                { projectId: project.id },
                {
                  environments,
                },
              );
            }
          },
        },
      );
    },
    [project, deleteEnvironment, trpcContext.environment.all],
  );

  const onClickDeleteEnvironment = useCallback(
    (id: string, name: string) => {
      setConfirmModalOpen({
        isOpen: true,
        data: {
          title: "Are you sure?",
          description: `This action cannot be undone. This will permanently delete the <b>${name}</b> environment, flags, history and remove all collaborator associations. `,
          type: "delete",
          buttonText: "Delete Environment",
          onClick: async () => {
            await onHandleDelete(id);
            setConfirmModalOpen({
              isOpen: false,
            });
          },
        },
      });
    },
    [onHandleDelete, setConfirmModalOpen],
  );

  const getTable = useMemo(
    () =>
      createTable(
        environments,
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
            onClick: () => onClickDeleteEnvironment(item.id, item.name),
            isDisabled: !!item.isDefault,
          },
        ],
      ),

    [onHandleEdit, environments, onClickDeleteEnvironment],
  );

  const getContent = () => {
    if (isMobile) {
      return environments?.map(({ id, slug, name, description, createdAt }) => (
        <MobileCard
          key={id}
          title={name}
          data={[
            { icon: "tag", text: slug },
            { icon: "description", text: description || "" },
            { icon: "calendar_month", text: dayjs(createdAt).fromNow() },
          ]}
        />
      ));
    }

    return <Table data={getTable} />;
  };

  return (
    <SettingCard
      title="Environments"
      description={`${
        isCurrentUserAdmin ? "Create and edit" : "All the"
      } environments for this project. Environments allow you to control how your feature flags behave in different settings or stages of development.`}
      button="Create New Environment"
      onClick={onHandleCreate}
      hasFooter={isCurrentUserAdmin}
    >
      {isLoading || !data ? (
        <Loader hasDelay={false}>
          <Skeleton
            items={[
              { h: 25, w: "15%", mb: 10 },
              { h: 1, w: "100%", mb: 10 },
              { h: 50, w: "100%", mb: 10 },
              { h: 50, w: "100%" },
            ]}
            padding={20}
            hasShadow={false}
          />
        </Loader>
      ) : (
        <>{getContent()}</>
      )}
    </SettingCard>
  );
};

export default EnvironmentsCard;
