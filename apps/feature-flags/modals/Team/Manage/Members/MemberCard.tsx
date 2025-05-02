import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Avatar,
  ButtonVariant,
  IconButton,
  Label,
  Text,
} from "@basestack/design-system";
import { Dropdown } from "@basestack/ui";

import { MemberInfo, MembersListItem } from "./styles";

export interface MemberCardProps {
  src: string;
  name: string;
  email: string;
  isPending: boolean;
  onCancelInvite: () => void;
}

const MemberCard = ({
  src,
  name,
  email,
  isPending,
  onCancelInvite,
}: MemberCardProps) => {
  const [role, setRole] = useState("Owner");
  const t = useTranslations("modal");

  const popupItems = [
    {
      text: t("members.list.item.dropdown.admin"),
      onClick: () => setRole(t("members.list.item.dropdown.admin")),
    },
    {
      text: t("members.list.item.dropdown.owner"),
      onClick: () => setRole(t("members.list.item.dropdown.owner")),
    },
    {
      text: t("members.list.item.dropdown.viewer"),
      onClick: () => setRole(t("members.list.item.dropdown.viewer")),
    },
  ];

  return (
    <MembersListItem>
      <Avatar
        src={src}
        userName={name}
        alt={t("members.list.item.avatar.alt")}
        size="medium"
        round
      />
      <MemberInfo>
        <Text size="medium" fontWeight={500}>
          {name}
        </Text>
        <Text size="small" muted>
          {email}
        </Text>
      </MemberInfo>

      {isPending ? (
        <>
          <Label text="Pending" variant="warning" isTranslucent />
          <IconButton
            icon="delete"
            onClick={onCancelInvite}
            variant="secondary"
          />
        </>
      ) : (
        <Dropdown
          button={{ text: role, variant: ButtonVariant.Outlined }}
          items={popupItems}
        />
      )}
    </MembersListItem>
  );
};

export default MemberCard;
