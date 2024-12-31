import React, { useMemo, useCallback } from "react";
import { useTheme } from "styled-components";
import { useMedia } from "react-use";
// Router
import { useParams } from "next/navigation";
// Components
import {
  ButtonVariant,
  Loader,
  Skeleton,
  Table,
} from "@basestack/design-system";
// UI
import { SettingCard, MobileSettingCardView } from "@basestack/ui";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
// Utils
import dayjs from "dayjs";
import { createTable } from "@basestack/utils";
// Types
import { Role } from "@prisma/client";
// Locales
import { useTranslations } from "next-intl";

const EnvironmentsCard = () => {
  const t = useTranslations("setting");
  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.md, false);
  const trpcUtils = api.useUtils();

  const { projectId } = useParams<{ projectId: string }>();

  const setCreateEnvironmentModalOpen = useStore(
    (state) => state.setCreateEnvironmentModalOpen,
  );
  const setUpdateEnvironmentModalOpen = useStore(
    (state) => state.setUpdateEnvironmentModalOpen,
  );
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);

  const [project, environment] = api.useQueries((t) => [
    t.project.byId({ projectId }, { enabled: !!projectId }),
    t.environment.all({ projectId }, { enabled: !!projectId }),
  ]);

  const deleteEnvironment = api.environment.delete.useMutation();
  const isCurrentUserAdmin = project?.data?.role === Role.ADMIN;
  const environments = useMemo(
    () =>
      !environment.isLoading && !!environment.data
        ? environment.data.environments
        : [],
    [environment.isLoading, environment.data],
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
      if (project?.data?.id) {
        const projectId = project?.data?.id;
        deleteEnvironment.mutate(
          {
            environmentId,
            projectId,
          },
          {
            onSuccess: async (result) => {
              // Get all the environments by project on the cache
              const prev = trpcUtils.environment.all.getData({
                projectId,
              });

              if (prev && prev.environments) {
                const environments = prev.environments.filter(
                  ({ id }) => id !== result.environment.id,
                );

                // Update the cache with the new data
                trpcUtils.environment.all.setData(
                  { projectId },
                  {
                    environments,
                  },
                );
              }
            },
          },
        );
      }
    },
    [project, deleteEnvironment, trpcUtils.environment.all],
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
        <MobileSettingCardView
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
      {environment.isLoading || !environment ? (
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
