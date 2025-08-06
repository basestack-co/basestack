// Types
import { Role } from ".prisma/client";
// UI
import {
  ButtonVariant,
  Loader,
  PopupMenu,
  Skeleton,
  Table,
} from "@basestack/design-system";
import { SettingCard } from "@basestack/ui";
// Utils
import { config, createTable } from "@basestack/utils";
// Libs
import { auth } from "@basestack/vendors";
import dayjs from "dayjs";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";

const { hasPermission, PERMISSIONS } = config;

export interface Props {
  role?: Role;
}

const MembersTableCard = ({ role }: Props) => {
  const t = useTranslations();
  const { data: session } = auth.client.useSession();
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const { formId } = useParams<{ formId: string }>();
  const setAddProjectMemberModalOpen = useStore(
    (state) => state.setAddFormMemberModalOpen
  );

  const { data, isLoading } = api.formMembers.list.useQuery(
    { formId },
    { enabled: !!formId }
  );

  const permissions = useMemo(
    () => ({
      canAddMember: hasPermission(role, PERMISSIONS.FORM.MEMBERS.CREATE),
    }),
    [role]
  );

  const removeUserFromForm = api.formMembers.delete.useMutation();
  const updateUserRole = api.formMembers.update.useMutation();

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
              if (session?.user.id === userId) {
                // the user removed himself from the project, so we redirect him to the dashboard
                router.push("/a");
              } else {
                const prev = trpcUtils.formMembers.list.getData({
                  formId,
                });

                if (prev?.users) {
                  const users = prev.users.filter(
                    (item) => item.userId !== result.connection.userId
                  );

                  trpcUtils.formMembers.list.setData(
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
    [formId, removeUserFromForm, session?.user.id, router, trpcUtils, t]
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
              const prev = trpcUtils.formMembers.list.getData({
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

                trpcUtils.formMembers.list.setData(
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
    [formId, updateUserRole, trpcUtils.formMembers.list, t]
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
              item.userId !== session?.user.id && {
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
    session?.user.id,
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
      hasFooter={permissions.canAddMember}
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
