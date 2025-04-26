"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "store";
import { api } from "utils/trpc/react";
import { Button, ButtonVariant, Text, Empty } from "@basestack/design-system";
import {
  ProjectCard as TeamCard,
  ProjectCardLoading as TeamCardLoading,
} from "@basestack/ui";
import { useTheme } from "styled-components";
import { Section, Header, TeamsList, ListItem } from "./styles";

const Teams = () => {
  const t = useTranslations("home");
  const theme = useTheme();

  const [setCreateTeamModalOpen, setManageTeamModalOpen] = useStore(
    useShallow((state) => [
      state.setCreateTeamModalOpen,
      state.setManageTeamModalOpen,
    ]),
  );

  const { data, isLoading } = api.team.all.useQuery(undefined, {
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
        })),
        total: {
          members: item._count.members,
        },
      })),
  });

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
          {data.map((team, index) => (
            <ListItem key={team.id}>
              <TeamCard
                text={team.name}
                onClick={team.onClick}
                avatars={team.members}
              />
            </ListItem>
          ))}
        </TeamsList>
      )}
    </Section>
  );
};

export default Teams;
