import React, { useCallback, useState } from "react";
import { Avatar, Button, Text, Input } from "@basestack/design-system";
import { api } from "utils/trpc/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Container,
  InputGroupContainer,
  InputGroupWrapper,
  MemberInfo,
  MembersList,
  MembersListItem,
} from "./styles";
import Dropdown from "./Dropdown";

export interface Props {
  teamId: string;
}

const Members = ({ teamId }: Props) => {
  const [email, setEmail] = useState("");

  const t = useTranslations("modal");
  const { data, isLoading } = api.team.byId.useQuery(
    { teamId },
    {
      enabled: !!teamId,
    },
  );

  const invite = api.team.invite.useMutation();

  const onSend = useCallback(() => {
    invite.mutate(
      { teamId, email, role: "DEVELOPER" },
      {
        onSuccess: () => {
          toast.success("Invitation sent successfully");
          setEmail("");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }, [invite, teamId, email]);

  const popupItems = [
    {
      text: t("members.list.item.dropdown.admin"),
      onClick: () => undefined,
    },
    {
      text: t("members.list.item.dropdown.owner"),
      onClick: () => undefined,
    },
    {
      text: t("members.list.item.dropdown.viewer"),
      onClick: () => undefined,
    },
  ];

  return (
    <Container>
      <Text size="small" fontWeight={500}>
        {t("members.input.title")}
      </Text>
      <InputGroupContainer>
        <InputGroupWrapper>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value=""
            name="email"
            placeholder={t("members.input.placeholder")}
          />
        </InputGroupWrapper>

        <Button onClick={onSend} isDisabled={invite.isPending}>
          {t("members.input.button")}
        </Button>
      </InputGroupContainer>
      <Text size="small" fontWeight={500}>
        {t("members.list.title")}
      </Text>
      <MembersList>
        {data?.members.map((member, index) => (
          <MembersListItem key={index}>
            <Avatar
              src={member.user.image || ""}
              userName={member.user.name || ""}
              alt={t("members.list.item.avatar.alt")}
              size="medium"
              round
            />
            <MemberInfo>
              <Text size="medium" fontWeight={500}>
                {member.user.name || ""}
              </Text>
              <Text size="small" muted>
                {member.user.email || ""}
              </Text>
            </MemberInfo>

            <Dropdown button="Owner" items={popupItems} />
          </MembersListItem>
        ))}
      </MembersList>
    </Container>
  );
};

export default Members;
