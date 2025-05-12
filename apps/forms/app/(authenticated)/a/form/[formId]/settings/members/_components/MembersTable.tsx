import React, { useCallback, useMemo } from "react";
// UI
import {
  ButtonVariant,
  Loader,
  PopupMenu,
  Skeleton,
  Table,
} from "@basestack/design-system";
import { SettingCard } from "@basestack/ui";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
// Utils
import { createTable, config } from "@basestack/utils";
import dayjs from "dayjs";
// Auth
import { useSession } from "next-auth/react";
// Router
import { useParams, useRouter } from "next/navigation";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";
// Types
import { Role } from ".prisma/client";

const { hasFormsPermission } = config.plans;

export interface Props {
  role?: Role;
}

const MembersTableCard = ({ role }: Props) => {
  const t = useTranslations();
  const session = useSession();
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const { formId } = useParams<{ formId: string }>();
  const setAddProjectMemberModalOpen = useStore(
    (state) => state.setAddFormMemberModalOpen
  );

  const { data, isLoading } = api.form.members.useQuery(
    { formId },
    { enabled: !!formId }
  );

  const removeUserFromForm = api.form.removeMember.useMutation();
  const updateUserRole = api.form.updateMember.useMutation();

  const isCurrentUserAdmin = role === Role.ADMIN;

  const onAddMemberModal = useCallback(() => {
    setAddProjectMemberModalOpen({ isOpen: true });
  }, [setAddProjectMemberModalOpen]);

  const onHandleDelete = useCallback(
    async (userId: string) => {
      if (formId) {
        removeUserFromForm.mutate(
          { formId, userId },
          {
            onSuccess: async (result) => {
              if (session?.data?.user.id === userId) {
                // the user removed himself from the project, so we redirect him to the dashboard
                router.push("/a");
              } else {
                await trpcUtils.form.recent.invalidate();

                const prev = trpcUtils.form.members.getData({
                  formId,
                });

                if (prev?.users) {
                  const users = prev.users.filter(
                    (item) => item.userId !== result.connection.userId
                  );

                  trpcUtils.form.members.setData(
                    {
                      formId,
                    },
                    { users }
                  );
                }

                toast.success(
                  t("modal.team.manage.tab.members.list.status.remove.success")
                );
              }
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      }
    },
    [formId, removeUserFromForm, session?.data?.user.id, router, trpcUtils, t]
  );

  const onHandleUpdateRole = useCallback(
    async (userId: string, role: "DEVELOPER" | "VIEWER" | "TESTER") => {
      if (formId) {
        updateUserRole.mutate(
          {
            formId,
            userId,
            role,
          },
          {
            onSuccess: async (result) => {
              const prev = trpcUtils.form.members.getData({
                formId,
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

                trpcUtils.form.members.setData(
                  {
                    formId,
                  },
                  { users }
                );

                toast.success(
                  t("modal.team.manage.tab.members.list.status.update.success")
                );
              }
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      }
    },
    [formId, updateUserRole, trpcUtils.form.members, t]
  );

  const getTable = useMemo(() => {
    const roleList: { [role: string]: string } = {
      [Role.ADMIN]: t("modal.team.manage.tab.members.list.option.admin"),
      [Role.DEVELOPER]: t(
        "modal.team.manage.tab.members.list.option.developer"
      ),
      [Role.TESTER]: t("modal.team.manage.tab.members.list.option.tester"),
      [Role.VIEWER]: t("modal.team.manage.tab.members.list.option.viewer"),
    };

    const assignableRoles = [Role.DEVELOPER, Role.TESTER, Role.VIEWER];

    return createTable(
      !isLoading && !!data ? data.users : [],
      [
        t("setting.members.add.table.headers.name"),
        t("setting.members.add.table.headers.email"),
        t("setting.members.add.table.headers.added-at"),
        t("setting.members.add.table.headers.role"),
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
          { title: dayjs(item.createdAt).fromNow() },
          {
            title: roleList[item.role],
            ...(isCurrentUserAdmin &&
              item.userId !== session?.data?.user.id && {
                children: (
                  <PopupMenu
                    button={{
                      text: roleList[item.role],
                      variant: ButtonVariant.Tertiary,
                      isDisabled:
                        updateUserRole.isPending ||
                        removeUserFromForm.isPending,
                    }}
                    items={[
                      ...assignableRoles.map((role) => ({
                        text: roleList[role],
                        isDisabled: role === item.role,
                        onClick: () => onHandleUpdateRole(item.userId, role),
                      })),
                      {
                        text: t(
                          "modal.team.manage.tab.members.list.option.remove"
                        ),
                        onClick: () => onHandleDelete(item.userId),
                        variant: ButtonVariant.Danger,
                      },
                    ]}
                  />
                ),
              }),
          },
        ];
      },
      // Disable actions
      () => []
    );
  }, [
    data,
    t,
    isLoading,
    isCurrentUserAdmin,
    session?.data?.user.id,
    onHandleUpdateRole,
    onHandleDelete,
    removeUserFromForm.isPending,
    updateUserRole.isPending,
  ]);

  return (
    <SettingCard
      title={t("setting.members.add.title")}
      description={t("setting.members.add.description")}
      button={t("setting.members.add.action")!}
      text={t("setting.members.add.placeholder")}
      onClick={onAddMemberModal}
      hasFooter={hasFormsPermission(role, "add_form_member")}
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
        <Table data={getTable} />
      )}
    </SettingCard>
  );
};

export default MembersTableCard;
