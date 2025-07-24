"use client";

// types
import { Role } from ".prisma/client";
// Components
import { Button, ButtonVariant, Empty, Text } from "@basestack/design-system";
import {
  ProjectCard as TeamCard,
  ProjectCardLoading as TeamCardLoading,
} from "@basestack/ui";
// Libs
import { auth } from "@basestack/vendors";
// Locales
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
// Toast
import { toast } from "sonner";
import { useStore } from "store";
// Styles
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
// Store
import { useShallow } from "zustand/react/shallow";
import { Header, ListItem, Section, TeamsList } from "./styles";

const Teams = () => {
  const { data: session } = auth.client.useSession();
  const trpcUtils = api.useUtils();
  const t = useTranslations("home");
  const theme = useTheme();

  const [setCreateTeamModalOpen, setManageTeamModalOpen, setConfirmModalOpen] =
    useStore(
      useShallow((state) => [
        state.setCreateTeamModalOpen,
        state.setManageTeamModalOpen,
        state.setConfirmModalOpen,
      ]),
    );

  const { data, isLoading } = api.teams.list.useQuery(undefined, {
    select: (teams) =>
      teams?.map((item) => ({
        id: item.id,
        slug: item.slug,
        onClick: () =>
          setManageTeamModalOpen({
            isOpen: true,
            data: {
              id: item.id,
              name: item.name,
            },
          }),
        name: item.name,
        members: item.members.map((member) => ({
          name: member.user.name,
          image: member.user.image,
          role: member.role,
          userId: member.userId,
        })),
        total: {
          members: item._count.members,
        },
      })),
  });

  const deleteTeam = api.teams.delete.useMutation();

  const onDeleteTeam = useCallback(
    (teamId: string, teamName: string) => {
      setConfirmModalOpen({
        isOpen: true,
        data: {
          title: t("teams.confirm.delete.title"),
          description: t("teams.confirm.delete.description", {
            name: `<b>${teamName}</b>`,
          }),
          type: "delete",
          buttonText: t("teams.confirm.delete.action"),
          onClick: () => {
            deleteTeam.mutate(
              {
                teamId,
              },
              {
                onSuccess: async () => {
                  setConfirmModalOpen({
                    isOpen: false,
                  });
                  await trpcUtils.subscription.usage.invalidate();
                  await trpcUtils.teams.list.invalidate();
                  toast.success(t("teams.confirm.delete.status.success"));
                },
                onError: (error) => {
                  toast.error(error.message, { duration: 10000 });
                },
              },
            );
          },
        },
      });
    },
    [deleteTeam, setConfirmModalOpen, t, trpcUtils],
  );

  return (
    <Section mb={theme.spacing.s7}>
      <Header>
        <Text size="xLarge" mr={theme.spacing.s5}>
          {t("teams.title")}
        </Text>
        {!!data?.length && (
          <Button
            flexShrink={0}
            variant={ButtonVariant.Outlined}
            onClick={() => setCreateTeamModalOpen({ isOpen: true })}
          >
            {t("teams.action")}
          </Button>
        )}
      </Header>
      {!isLoading && !data?.length && (
        <Empty
          p={`${theme.spacing.s6} ${theme.spacing.s5}`}
          iconName="group"
          title={t("teams.empty.title")}
          description={t("teams.empty.description")}
          button={{
            text: t("teams.empty.action"),
            onClick: () => setCreateTeamModalOpen({ isOpen: true }),
          }}
        />
      )}
      {isLoading && (
        <TeamsList>
          <TeamCardLoading />
        </TeamsList>
      )}
      {!isLoading && !!data?.length && (
        <TeamsList>
          {data.map((team) => {
            const isOwnerOfTeam =
              team.members.find(({ userId }) => userId === session?.user?.id)
                ?.role === Role.ADMIN;

            return (
              <ListItem key={team.id}>
                <TeamCard
                  text={t("teams.name", { name: team.name })}
                  onClick={team.onClick}
                  avatars={team.members}
                  {...(isOwnerOfTeam
                    ? {
                        menuItems: [
                          {
                            icon: "edit",
                            text: t("teams.menu.manage"),
                            onClick: team.onClick,
                          },
                          {
                            icon: "delete",
                            text: t("teams.menu.delete"),
                            onClick: () => onDeleteTeam(team.id, team.name),
                            variant: ButtonVariant.Danger,
                          },
                        ],
                      }
                    : {
                        label: {
                          text: t("teams.tag.text"),
                          tooltip: t("teams.tag.tooltip"),
                        },
                      })}
                />
              </ListItem>
            );
          })}
        </TeamsList>
      )}
    </Section>
  );
};

export default Teams;
