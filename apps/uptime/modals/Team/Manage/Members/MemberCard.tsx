// types
import { Role } from ".prisma/client";
// Components
import {
  Avatar,
  ButtonVariant,
  IconButton,
  Label,
  PopupMenu,
  Text,
} from "@basestack/design-system";
// Locales
import { useTranslations } from "next-intl";
import { useCallback } from "react";

import { MemberInfo, MembersListItem } from "./styles";

export interface MemberCardProps {
  src: string;
  userId: string;
  inviteId?: string;
  name: string;
  email: string;
  isPending: boolean;
  isSubmitting?: boolean;
  hasRoleOptions?: boolean;
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
  hasRoleOptions,
  isPending,
  isSubmitting,
  onSelectRole,
  onRemoveMember,
  onCancelInvite,
}: MemberCardProps) => {
  const t = useTranslations("modal");

  const getRoleString = useCallback(
    (role: Role) => {
      const list: { [role: string]: string } = {
        [Role.ADMIN]: t("team.manage.tab.members.list.option.admin"),
        [Role.DEVELOPER]: t("team.manage.tab.members.list.option.developer"),
        [Role.OPERATOR]: t("team.manage.tab.members.list.option.operator"),
        [Role.VIEWER]: t("team.manage.tab.members.list.option.viewer"),
      };

      return list[role];
    },
    [t]
  );

  const onRenderOptions = useCallback(() => {
    if (!hasRoleOptions || role === Role.ADMIN) {
      return (
        <Label text={getRoleString(role)} variant="default" isTranslucent />
      );
    }

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

    const assignableRoles = [Role.DEVELOPER, Role.OPERATOR, Role.VIEWER];

    const dropdownItems = [
      ...assignableRoles.map((assignableRole) => ({
        text: getRoleString(assignableRole),
        isDisabled: role === assignableRole,
        onClick: () => onSelectRole(userId, assignableRole),
      })),
      {
        text: t("team.manage.tab.members.list.option.remove"),
        onClick: () => onRemoveMember(userId),
        variant: ButtonVariant.Danger,
      },
    ];

    return (
      <PopupMenu
        button={{
          text: getRoleString(role),
          variant: ButtonVariant.Outlined,
          isDisabled: isSubmitting,
        }}
        items={dropdownItems}
      />
    );
  }, [
    getRoleString,
    hasRoleOptions,
    inviteId,
    isPending,
    isSubmitting,
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
