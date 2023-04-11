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
// Styles
import { CardList, CardListItem } from "../styles";
// Types
import { Row } from "@basestack/design-system/organisms/Table/types";

export const headers = ["Name", "Email", "Role"];

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const MembersModule = ({ project }: Props) => {
  const trpcContext = trpc.useContext();
  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen
  );

  const { data, isLoading } = trpc.user.byProjectId.useQuery(
    { projectId: project?.id! },
    { enabled: !!project?.id }
  );

  const removeUserFromProject = trpc.user.removeFromProject.useMutation();

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
              await trpcContext.user.byProjectId.invalidate();
            },
          }
        );
      }
    },
    [project, removeUserFromProject, trpcContext]
  );

  const getTable = useMemo(() => {
    if (!isLoading && !!data) {
      const rows = data.users.map(({ userId, user, role }) => {
        const row: Row = {
          cols: [
            {
              image: {
                userName: user.name!,
                src: user.image!,
              },
              title: user.name!,
            },
            { title: user.email! },
            { title: role === "ADMIN" ? "Admin" : "User" },
          ],
          more: [
            {
              icon: "delete",
              text: "Remove",
              variant: ButtonVariant.Danger,
              onClick: () => onHandleDelete(userId),
              isDisabled: role === "ADMIN",
            },
          ],
        };
        return row;
      });

      return { headers, rows };
    }

    return { headers, rows: [] };
  }, [isLoading, data, onHandleDelete]);

  if (isLoading || !data) {
    return (
      <Loader>
        <Spinner size="large" />
      </Loader>
    );
  }

  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Team members"
          description="Manage Team Members."
          button="Invite Member"
          onClick={onHandleInvite}
        >
          <Table data={getTable} />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default MembersModule;
