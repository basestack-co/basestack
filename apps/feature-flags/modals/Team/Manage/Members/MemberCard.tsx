import React, { useCallback } from "react";
// Locales
import { useTranslations } from "next-intl";
// Components
import {
  Avatar,
  ButtonVariant,
  IconButton,
  Label,
  Text,
} from "@basestack/design-system";
import { Dropdown } from "@basestack/ui";
// types
import { Role } from ".prisma/client";

import { MemberInfo, MembersListItem } from "./styles";

export interface MemberCardProps {
  src: string;
  userId: string;
  inviteId?: string;
  name: string;
  email: string;
  isPending: boolean;
  role: Role;
  onCancelInvite: (inviteId?: string) => void;
  onSelectRole: (userId: string, role: Role) => void;
  onRemoveMember: (userId: string) => void;
}

const MemberCard = ({
  src,
  userId,
  inviteId,
  name,
  email,
  role,
  isPending,
  onSelectRole,
  onRemoveMember,
  onCancelInvite,
}: MemberCardProps) => {
  const t = useTranslations("modal");

  const getRoleString = useCallback(
    (role: Role) => {
      const list: { [role: string]: string } = {
        [Role.DEVELOPER]: t("team.manage.tab.members.list.option.developer"),
        [Role.TESTER]: t("team.manage.tab.members.list.option.tester"),
        [Role.VIEWER]: t("team.manage.tab.members.list.option.viewer"),
      };

      return list[role];
    },
    [t],
  );

  const onRenderOptions = useCallback(() => {
    if (role === Role.ADMIN) return null;

    if (isPending) {
      return (
        <>
          <Label
            text={t("team.manage.tab.members.list.status.pending")}
            variant="warning"
            isTranslucent
          />
          <IconButton
            icon="delete"
            onClick={() => onCancelInvite(inviteId)}
            variant="secondary"
          />
        </>
      );
    }

    const assignableRoles = [Role.DEVELOPER, Role.TESTER, Role.VIEWER];

    const dropdownItems = [
      ...assignableRoles.map((assignableRole) => ({
        text: getRoleString(assignableRole),
        onClick: () => onSelectRole(userId, assignableRole),
      })),
      {
        text: t("team.manage.tab.members.list.option.remove"),
        onClick: () => onRemoveMember(userId),
        variant: ButtonVariant.Danger,
      },
    ];

    return (
      <Dropdown
        button={{ text: getRoleString(role), variant: ButtonVariant.Outlined }}
        items={dropdownItems}
      />
    );
  }, [
    getRoleString,
    inviteId,
    isPending,
    onCancelInvite,
    onRemoveMember,
    onSelectRole,
    role,
    t,
    userId,
  ]);

  return (
    <MembersListItem>
      <Avatar
        src={src}
        userName={name}
        alt={t("team.manage.tab.members.list.avatar.alt")}
        size="medium"
        round
      />
      <MemberInfo>
        <Text size="medium" fontWeight={500}>
          {name}
        </Text>
        {email && (
          <Text size="small" muted>
            {email}
          </Text>
        )}
      </MemberInfo>
      {onRenderOptions()}
    </MembersListItem>
  );
};

export default MemberCard;
