import React, { useCallback, useMemo } from "react";
// Components
import {
  ButtonVariant,
  Loader,
  PopupMenu,
  Skeleton,
  Table,
} from "@basestack/design-system";
import { useTheme } from "styled-components";
import { useMedia } from "react-use";
// UI
import { MobileSettingCardView, SettingCard } from "@basestack/ui";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
// Utils
import { createTable } from "@basestack/utils";
// Auth
import { useSession } from "next-auth/react";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// Types
import { Role } from ".prisma/client";
// Utils
import dayjs from "dayjs";

export interface Props {
  role?: Role;
}

const InviteCard = ({ role }: Props) => {
  const t = useTranslations("setting");
  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.md, false);
  const session = useSession();
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const { projectId } = useParams<{ projectId: string }>();
<<<<<<< Updated upstream
  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen,
=======
  const setAddMemberProjectModalOpen = useStore(
    (state) => state.setAddMemberProjectModalOpen
>>>>>>> Stashed changes
  );

  const { data, isLoading } = api.project.members.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  const removeUserFromProject = api.project.removeMember.useMutation();
  const updateUserRole = api.project.updateMember.useMutation();

  const isCurrentUserAdmin = role === Role.ADMIN;

  const onHandleInvite = useCallback(() => {
    setAddMemberProjectModalOpen({ isOpen: true });
  }, [setAddMemberProjectModalOpen]);

  const onHandleDelete = useCallback(
    async (userId: string) => {
      if (projectId) {
        removeUserFromProject.mutate(
          { projectId, userId },
          {
            onSuccess: async (result) => {
              if (session?.data?.user.id === userId) {
                // the user removed himself from the project, so we redirect him to the dashboard
                router.push("/a");
              } else {
                const prev = trpcUtils.project.members.getData({
                  projectId,
                });

                if (prev?.users) {
                  const users = prev.users.filter(
                    (item) => item.userId !== result.connection.userId,
                  );

                  trpcUtils.project.members.setData(
                    {
                      projectId,
                    },
                    { users },
                  );
                }
              }
            },
          },
        );
      }
    },
    [projectId, removeUserFromProject, trpcUtils, session, router],
  );

  const onHandleUpdateRole = useCallback(
    async (userId: string, isAdmin: boolean) => {
      if (projectId) {
        updateUserRole.mutate(
          {
            projectId,
            userId,
            role: isAdmin ? "USER" : "ADMIN",
          },
          {
            onSuccess: async (result) => {
              const prev = trpcUtils.project.members.getData({
                projectId,
              });

              if (prev?.users) {
                const users = prev.users.map((item) => {
                  if (item.userId === result.connection.userId) {
                    return {
                      ...item,
                      role: result.connection.role,
                    };
                  }

                  return item;
                });

                trpcUtils.project.members.setData(
                  {
                    projectId,
                  },
                  { users },
                );
              }
            },
          },
        );
      }
    },
    [projectId, updateUserRole, trpcUtils],
  );

  const getTable = useMemo(() => {
    const numberOfAdmins = data?.users.filter(
      (item) => item.role === Role.ADMIN,
    ).length;

    return createTable(
      !isLoading && !!data ? data.users : [],
      [
        t("members.invite.table.headers.name"),
        t("members.invite.table.headers.email"),
        t("members.invite.table.headers.role"),
        t("members.invite.table.headers.invited-at"),
      ],
      (item) => {
        return [
          {
            image: {
              userName: item.user.name!,
              src: item.user.image!,
            },
            title: item.user.name!,
          },
          { title: item.user.email! },
          {
            title: item.role,
            children: (
              <PopupMenu
                button={{ text: "Admin", variant: ButtonVariant.Tertiary }}
                items={[{ text: "Example", onClick: () => undefined }]}
              />
            ),
          },
          { title: dayjs(item.createdAt).fromNow() },
        ];
      },
      (item) => {
        const isSameUser = session?.data?.user.id === item.userId;
        const isAdmin = item.role === Role.ADMIN;

        return [
          ...(isCurrentUserAdmin && !isSameUser
            ? [
                {
                  icon: "shield",
                  text: `Set as ${isAdmin ? "User" : "Admin"}`,
                  onClick: () => onHandleUpdateRole(item.userId, isAdmin),
                },
              ]
            : []),

          ...(isCurrentUserAdmin || isSameUser
            ? [
                {
                  icon: isSameUser ? "exit_to_app" : "delete",
                  text: isSameUser ? "Leave" : "Remove",
                  variant: ButtonVariant.Danger,
                  onClick: () => onHandleDelete(item.userId),
                  isDisabled: isAdmin && (numberOfAdmins ?? 0) <= 1,
                },
              ]
            : []),
        ];
      },
    );
  }, [
    t,
    data,
    isLoading,
    session?.data?.user.id,
    isCurrentUserAdmin,
    onHandleUpdateRole,
    onHandleDelete,
  ]);

  const getContent = () => {
    if (isMobile) {
      const users = !isLoading && !!data ? data.users : [];

      return users?.map(({ user, role, createdAt }, index) => (
        <MobileSettingCardView
          key={index}
          title={user.name || ""}
          data={[
            { icon: "mail", text: user.email || "" },
            {
              icon:
                role === Role.ADMIN ? "admin_panel_settings" : "account_circle",
              text: role,
            },
            { icon: "calendar_month", text: dayjs(createdAt).fromNow() },
          ]}
        />
      ));
    }

    return <Table data={getTable} />;
  };

  return (
    <SettingCard
      title={t("members.invite.title")}
      description={t("members.invite.description")}
      button={t("members.invite.action")!}
      text={t("members.invite.placeholder")}
      onClick={onHandleInvite}
      hasFooter={isCurrentUserAdmin}
    >
      {isLoading || !data ? (
        <Loader hasDelay={false}>
          <Skeleton
            items={[
              { h: 25, w: "15%", mb: 10 },
              { h: 1, w: "100%", mb: 10 },
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

export default InviteCard;
