import React, { useMemo, useCallback } from "react";
// Router
import { useParams } from "next/navigation";
// UI
import {
  ButtonVariant,
  Loader,
  Skeleton,
  Table,
} from "@basestack/design-system";
import { SettingCard } from "@basestack/ui";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
// Utils
import dayjs from "dayjs";
import { createTable } from "@basestack/utils";
// Types
import { Role } from ".prisma/client";
// Locales
import { useTranslations } from "next-intl";

export interface Props {
  role?: Role;
}

const EnvironmentsCard = ({ role }: Props) => {
  const t = useTranslations("setting");
  const trpcUtils = api.useUtils();

  const { projectId } = useParams<{ projectId: string }>();

  const setCreateEnvironmentModalOpen = useStore(
    (state) => state.setCreateEnvironmentModalOpen,
  );
  const setUpdateEnvironmentModalOpen = useStore(
    (state) => state.setUpdateEnvironmentModalOpen,
  );
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);

  const { data, isLoading } = api.projectEnvironments.list.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  const deleteEnvironment = api.projectEnvironments.delete.useMutation();
  const isCurrentUserAdmin = role === Role.ADMIN;
  const environments = useMemo(
    () => (!isLoading && !!data ? data.environments : []),
    [isLoading, data],
  );

  const onHandleEdit = useCallback(
    (environmentId: string) => {
      if (!!projectId) {
        setUpdateEnvironmentModalOpen({
          isOpen: true,
          data: {
            environment: { id: environmentId },
          },
        });
      }
    },
    [projectId, setUpdateEnvironmentModalOpen],
  );

  const onHandleCreate = useCallback(() => {
    if (!!projectId) {
      setCreateEnvironmentModalOpen({ isOpen: true });
    }
  }, [projectId, setCreateEnvironmentModalOpen]);

  const onHandleDelete = useCallback(
    async (environmentId: string) => {
      if (projectId) {
        deleteEnvironment.mutate(
          {
            environmentId,
            projectId,
          },
          {
            onSuccess: async (result) => {
              if (result) {
                await trpcUtils.projectEnvironments.list.invalidate();
                await trpcUtils.projectKeys.list.invalidate({ projectId });
                await trpcUtils.projectFlags.list.invalidate();
              }
            },
          },
        );
      }
    },
    [deleteEnvironment, projectId, trpcUtils],
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
        <Table data={getTable} />
      )}
    </SettingCard>
  );
};

export default EnvironmentsCard;
