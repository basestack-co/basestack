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
// Locales
import useTranslation from "next-translate/useTranslation";

type Props = ProjectSettings;
const EnvironmentsCard = ({ project }: Props) => {
  const { t } = useTranslation("settings");
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
          title: t("others.environments.modal.delete.title"),
          description: t("others.environments.modal.delete.description", {
            name: `<b>${name}</b>`,
          }),
          type: "delete",
          buttonText: t("others.environments.modal.delete.action"),
          onClick: async () => {
            await onHandleDelete(id);
            setConfirmModalOpen({
              isOpen: false,
            });
          },
        },
      });
    },
    [onHandleDelete, setConfirmModalOpen, t],
  );

  const getTable = useMemo(
    () =>
      createTable(
        environments,
        [
          t("others.environments.table.headers.environment"),
          t("others.environments.table.headers.slug"),
          t("others.environments.table.headers.description"),
          t("others.environments.table.headers.created-at"),
        ],
        (item) => [
          { title: item.name },
          { title: item.slug },
          { title: item.description ?? "" },
          { title: dayjs(item.createdAt).fromNow() },
        ],
        (item) => [
          {
            icon: "edit",
            text: t("others.environments.actions.edit"),
            onClick: () => onHandleEdit(item.id),
          },
          {
            icon: "delete",
            text: t("others.environments.actions.delete"),
            variant: ButtonVariant.Danger,
            onClick: () => onClickDeleteEnvironment(item.id, item.name),
            isDisabled: !!item.isDefault,
          },
        ],
      ),

    [onHandleEdit, environments, onClickDeleteEnvironment, t],
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
      title={t("others.environments.title")}
      description={t("others.environments.description", {
        type: t(`others.environments.${isCurrentUserAdmin ? "admin" : "user"}`),
      })}
      button={t("others.environments.action")!}
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
