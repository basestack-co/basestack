import React, { useCallback, useMemo } from "react";
// Components
import { Text } from "@basestack/design-system";
import MemberCard from "./MemberCard";
import InviteForm from "./InviteForm";
// Server
import { api } from "utils/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";
// Libs
import { auth } from "@basestack/vendors";
// Styles
import { Container, MembersList } from "./styles";
// types
import { Role } from ".prisma/client";

export interface Props {
  teamId: string;
}

const Members = ({ teamId }: Props) => {
  const t = useTranslations("modal");
  const { data: session } = auth.client.useSession();
  const trpcUtils = api.useUtils();

  const { data, isLoading } = api.team.byId.useQuery(
    { teamId },
    {
      select: (data) => {
        const members =
          data?.members.map((member) => ({
            userId: member.user.id,
            name: member.user.name ?? "",
            src: member.user.image ?? "",
            email: member.user.email ?? "",
            role: member.role,
            isPending: false,
          })) ?? [];

        const invitations =
          data?.invitations.map((invitation) => ({
            userId: "",
            inviteId: invitation.id,
            name: invitation.email ?? "",
            src: "",
            email: "",
            role: invitation.role,
            isPending: true,
          })) ?? [];

        return [...invitations, ...members];
      },
      enabled: !!teamId,
      placeholderData: keepPreviousData,
    },
  );

  const isOwnerOfTeam = useMemo(() => {
    const user = data?.find(({ userId }) => userId === session?.user?.id);
    return user?.role === Role.ADMIN;
  }, [data, session?.user?.id]);

  const removeMember = api.team.removeMember.useMutation();
  const updateMember = api.team.updateMember.useMutation();
  const removeInvite = api.team.removeInvite.useMutation();

  const onSelectRole = useCallback(
    (userId: string, role: Role) => {
      updateMember.mutate(
        {
          teamId,
          role: role as "DEVELOPER" | "VIEWER" | "TESTER",
          userId,
        },
        {
          onSuccess: async () => {
            await trpcUtils.team.all.invalidate();
            await trpcUtils.team.byId.invalidate({ teamId });
            toast.success(
              t("team.manage.tab.members.list.status.update.success"),
            );
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    },
    [t, teamId, trpcUtils, updateMember],
  );

  const onRemoveMember = useCallback(
    (userId: string) => {
      removeMember.mutate(
        {
          teamId,
          userId,
        },
        {
          onSuccess: async () => {
            await trpcUtils.subscription.usage.invalidate(); 
            await trpcUtils.team.all.invalidate();
            await trpcUtils.team.byId.invalidate({ teamId });
            toast.success(
              t("team.manage.tab.members.list.status.remove.success"),
            );
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    },
    [removeMember, t, teamId, trpcUtils],
  );

  const onCancelInvite = useCallback(
    (inviteId?: string) => {
      if (inviteId) {
        removeInvite.mutate(
          {
            inviteId,
          },
          {
            onSuccess: async () => {
              await trpcUtils.team.all.invalidate();
              await trpcUtils.team.byId.invalidate({ teamId });
              toast.success(
                t("team.manage.tab.members.list.status.invite.success"),
              );
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      }
    },
    [removeInvite, t, teamId, trpcUtils],
  );

  return (
    <Container>
      {isOwnerOfTeam && <InviteForm teamId={teamId} />}
      <Text size="small" fontWeight={500}>
        {t("team.manage.tab.members.title")}
      </Text>
      <MembersList>
        {data?.map((member, index) => (
          <MemberCard
            key={index}
            onCancelInvite={onCancelInvite}
            onSelectRole={onSelectRole}
            onRemoveMember={onRemoveMember}
            hasRoleOptions={isOwnerOfTeam}
            isSubmitting={
              removeInvite.isPending ||
              updateMember.isPending ||
              removeMember.isPending ||
              isLoading
            }
            {...member}
          />
        ))}
      </MembersList>
    </Container>
  );
};

export default Members;
