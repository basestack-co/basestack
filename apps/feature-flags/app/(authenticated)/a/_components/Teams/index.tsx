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
  Avatar,
  Button,
  ButtonVariant,
  Card,
  HorizontalRule,
  Icon,
  Skeleton,
  Text,
  Empty,
} from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
// Utils
import {
  Section,
  Header,
  TeamsList,
  Row,
  ListItem,
  Box,
  CardButton,
} from "./styles";

interface TeamCardProps {
  text: string;
  onClick: () => void;
  flags: number;
}

const TeamCard = ({ onClick, text, flags = 0 }: TeamCardProps) => {
  const theme = useTheme();
  return (
    <ListItem>
      <CardButton onClick={onClick}>
        <Card height="100%" width="100%" hasHoverAnimation>
          <Box mb="auto" p={theme.spacing.s5}>
            <Avatar
              size="xSmall"
              userName={text}
              alt={`${text} project`}
              round={false}
            />
            <Text size="small" textAlign="left" mt={theme.spacing.s3}>
              {text}
            </Text>
          </Box>
          <HorizontalRule />
          <Box p={`${theme.spacing.s3} ${theme.spacing.s5}`}>
            <Row>
              <Icon icon="flag" size="small" />
              <Text size="small" textAlign="left" ml={theme.spacing.s1}>
                {flags}
              </Text>
            </Row>
          </Box>
        </Card>
      </CardButton>
    </ListItem>
  );
};

const Teams = () => {
  const t = useTranslations("home");
  const theme = useTheme();

  const [setCreateTeamModalOpen, setManageTeamModalOpen] = useStore(
    useShallow((state) => [
      state.setCreateTeamModalOpen,
      state.setManageTeamModalOpen,
    ])
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
          {data.map((team) => (
            <TeamCard
              key={team.id}
              text={team.name}
              onClick={team.onClick}
              flags={10}
            />
          ))}
        </TeamsList>
      )}
    </Section>
  );
};

export default Teams;
