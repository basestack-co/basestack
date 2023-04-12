import React, { useMemo, useCallback } from "react";
// Components
import {
  ButtonVariant,
  Loader,
  SettingCard,
  Spinner,
  Table,
} from "@basestack/design-system";
// Libs
import { RouterOutput, trpc } from "libs/trpc";
// Store
import { useStore } from "store";
// Utils
import { createTable } from "utils/table";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const InviteCard = ({ project }: Props) => {
  const trpcContext = trpc.useContext();
  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen
  );

  const { data, isLoading } = trpc.project.members.useQuery(
    { projectId: project?.id! },
    { enabled: !!project?.id }
  );

  const removeUserFromProject = trpc.project.removeMember.useMutation();

  const onHandleInvite = useCallback(() => {
    if (project) {
      console.log("create here");
      setInviteMemberModalOpen({ isOpen: true, data: { project } });
    }
  }, [project, setInviteMemberModalOpen]);

  const onHandleDelete = useCallback(
    async (userId: string) => {
      if (project) {
        removeUserFromProject.mutate(
          { projectId: project.id, userId },
          {
            onSuccess: async (result) => {
              // TODO: migrate this to use cache from useQuery
              await trpcContext.project.members.invalidate();
            },
          }
        );
      }
    },
    [project, removeUserFromProject, trpcContext]
  );

  const getTable = useMemo(
    () =>
      createTable(
        !isLoading && !!data ? data.users : [],
        ["Name", "Email", "Role"],
        (item) => [
          {
            image: {
              userName: item.user.name!,
              src: item.user.image!,
            },
            title: item.user.name!,
          },
          { title: item.user.email! },
          { title: item.role === "ADMIN" ? "Admin" : "User" },
        ],
        (item) => [
          ...(item.role === "USER"
            ? [
                {
                  icon: "shield",
                  text: "Set as Admin",
                  onClick: () => console.log(""),
                },
              ]
            : []),
          {
            icon: "delete",
            text: "Remove",
            variant: ButtonVariant.Danger,
            onClick: () => onHandleDelete(item.userId),
            isDisabled: item.role === "ADMIN",
          },
        ]
      ),

    [isLoading, data, onHandleDelete]
  );

  return (
    <SettingCard
      title="Team members"
      description="Manage Team Members."
      button="Invite Member"
      onClick={onHandleInvite}
    >
      {isLoading || !data ? (
        <Loader>
          <Spinner size="large" />
        </Loader>
      ) : (
        <Table data={getTable} />
      )}
    </SettingCard>
  );
};

export default InviteCard;
