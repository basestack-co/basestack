import React, { useMemo, useCallback } from "react";
// Styles
import { ButtonVariant, Table } from "@basestack/design-system";
// Server
import { api } from "utils/trpc/react";
// Utils
import { createTable } from "@basestack/utils";
import dayjs from "dayjs";
// Types
import { Role } from ".prisma/client";
// Locales
import { useTranslations } from "next-intl";
// Auth
import { useSession } from "next-auth/react";

export interface Props {
  teamId: string;
}

const MembersTab = ({ teamId }: Props) => {
  const t = useTranslations("setting");
  const session = useSession();
  const { data, isLoading } = api.team.byId.useQuery(
    { teamId },
    {
      enabled: !!teamId,
    },
  );

  const isCurrentUserAdmin = true; // role === Role.ADMIN;

  const getTable = useMemo(() => {
    const numberOfAdmins = data?.members.filter(
      (item) => item.role === "ADMIN",
    ).length;

    return createTable(
      !isLoading && !!data ? data?.members : [],
      [
        t("members.invite.table.headers.name"),
        t("members.invite.table.headers.email"),
        t("members.invite.table.headers.role"),
      ],
      (item) => [
        {
          image: {
            userName: item.user.name!,
            src: item.user.image!,
          },
          title: item.user.name!,
        },
        { title: item.user.email! },
        { title: item.role },
      ],
      (item) => {
        const isSameUser = session?.data?.user.id === item.user.id;
        const isAdmin = item.role === Role.ADMIN;

        return [
          ...(isCurrentUserAdmin && !isSameUser
            ? [
                {
                  icon: "shield",
                  text: `Set as ${isAdmin ? "User" : "Admin"}`,
                  onClick: () => console.log("Update Role"),
                },
              ]
            : []),

          ...(isCurrentUserAdmin || isSameUser
            ? [
                {
                  icon: isSameUser ? "exit_to_app" : "delete",
                  text: isSameUser ? "Leave" : "Remove",
                  variant: ButtonVariant.Danger,
                  onClick: () => console.log("Remove Member"),
                  isDisabled: isAdmin && (numberOfAdmins ?? 0) <= 1,
                },
              ]
            : []),
        ];
      },
    );
  }, [t, data, isLoading, session?.data?.user.id, isCurrentUserAdmin]);

  return (
    <div>
      <Table data={getTable} />
    </div>
  );
};

export default MembersTab;
