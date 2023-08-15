import React, { useMemo, useCallback } from "react";
// Components
import {
  ButtonVariant,
  Loader,
  Skeleton,
  Table,
} from "@basestack/design-system";
import { useTheme } from "styled-components";
import { useMedia } from "react-use";
import SettingCard from "../SettingCard";
import MobileCard from "../MobileCard";
// Libs
import { trpc } from "libs/trpc";
// Store
import { useStore } from "store";
// Utils
import { createTable } from "utils/helpers/table";
// Auth
import { useSession } from "next-auth/react";
// Router
import { useRouter } from "next/router";
// Types
import { ProjectSettings } from "types";
import { Role } from "@prisma/client";
// Utils
import dayjs from "dayjs";

type Props = ProjectSettings;

const InviteCard = ({ project }: Props) => {
  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.md, false);
  const session = useSession();
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen,
  );

  const { data, isLoading } = trpc.project.members.useQuery(
    { projectId: project.id },
    { enabled: !!project.id },
  );

  const removeUserFromProject = trpc.project.removeMember.useMutation();
  const updateUserRole = trpc.project.updateMember.useMutation();

  const isCurrentUserAdmin = project.role === Role.ADMIN;

  const onHandleInvite = useCallback(() => {
    setInviteMemberModalOpen({ isOpen: true, data: { project } });
  }, [project, setInviteMemberModalOpen]);

  const onHandleDelete = useCallback(
    async (userId: string) => {
      removeUserFromProject.mutate(
        { projectId: project.id, userId },
        {
          onSuccess: async (result) => {
            if (session?.data?.user.id === userId) {
              // the user removed himself from the project, so we redirect him to the dashboard
              await router.push("/");
            } else {
              const prev = trpcContext.project.members.getData({
                projectId: project.id,
              });

              if (prev?.users) {
                const users = prev.users.filter(
                  (item) => item.userId !== result.connection.userId,
                );

                trpcContext.project.members.setData(
                  {
                    projectId: project.id,
                  },
                  { users },
                );
              }
            }
          },
        },
      );
    },
    [project, removeUserFromProject, trpcContext, session, router],
  );

  const onHandleUpdateRole = useCallback(
    async (userId: string, isAdmin: boolean) => {
      updateUserRole.mutate(
        {
          projectId: project.id,
          userId,
          role: isAdmin ? "USER" : "ADMIN",
        },
        {
          onSuccess: async (result) => {
            const prev = trpcContext.project.members.getData({
              projectId: project.id,
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

              trpcContext.project.members.setData(
                {
                  projectId: project.id,
                },
                { users },
              );
            }
          },
        },
      );
    },
    [project, updateUserRole, trpcContext],
  );

  const getTable = useMemo(() => {
    const numberOfAdmins = data?.users.filter((item) => item.role === "ADMIN")
      .length;

    return createTable(
      !isLoading && !!data ? data.users : [],
      ["Name", "Email", "Role", "Invited At"],
      (item) => [
        {
          image: {
            userName: item.user.name!,
            src: item.user.image!,
          },
          title: item.user.name!,
        },
        { title: item.user.email! },
        { title: item.role === Role.ADMIN ? "Admin" : "User" },
        { title: dayjs(item.createdAt).fromNow() },
      ],
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
        <MobileCard
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
      title="Team Members"
      description="Add members of your organization to manage this project. Developers can also be invited to access API keys for code integration."
      button="Add Member"
      text="Note: Users must already have an account to appear in the list (Email Invites Coming Soon)."
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
