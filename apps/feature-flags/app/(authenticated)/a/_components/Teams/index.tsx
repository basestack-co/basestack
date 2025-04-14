"use client";

import React from "react";
// Locales
import { useTranslations } from "next-intl";
// Router
import { useRouter } from "next/navigation";
// Store
import { useShallow } from "zustand/react/shallow";
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";
// Components
import { EmptyStateWithAction } from "@basestack/ui";
import {
  Button,
  ButtonVariant,
  Skeleton,
  Text,
} from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
// Utils
import { Section, Header, TeamsList } from "./styles";

const Teams = () => {
  const t = useTranslations("home");
  const theme = useTheme();
  const router = useRouter();

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
        members: item.members,
        total: {
          members: item._count.members,
          projects: item._count.projects,
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
        <EmptyStateWithAction
          icon={{
            name: "group",
          }}
          title={t("teams.empty.title")}
          description={t("teams.empty.description")}
          button={{
            text: t("teams.empty.action"),
            onClick: () => setCreateTeamModalOpen({ isOpen: true }),
            variant: ButtonVariant.Primary,
          }}
        />
      )}

      {isLoading && (
        <TeamsList>
          <Skeleton
            numberOfItems={1}
            items={[
              { h: 28, w: 28, mb: 12 },
              { h: 22, w: "50%", mb: 32 },
              { h: 22, w: 28 },
            ]}
            padding="20px 20px 12px 20px"
          />
        </TeamsList>
      )}
      {!isLoading && !!data?.length && (
        <TeamsList>
          {data.slice(0, 4).map((team) => (
            <div key={team.id}>
              <h2>{team.name}</h2>
              <button onClick={team.onClick}>Manage</button>
            </div>
          ))}
        </TeamsList>
      )}
    </Section>
  );
};

export default Teams;
