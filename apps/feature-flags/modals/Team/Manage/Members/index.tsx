import React, { useCallback, useState } from "react";
import { Button, Text, Input } from "@basestack/design-system";
import { api } from "utils/trpc/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Container,
  InputGroupContainer,
  InputGroupWrapper,
  MembersList,
} from "./styles";
import MemberCard from "./MemberCard";

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
          <MemberCard
            key={index}
            name={member.user.name || ""}
            src={member.user.image || ""}
            email={member.user.email || ""}
            onCancelInvite={() => undefined}
            isPending={false}
          />
        ))}
      </MembersList>
    </Container>
  );
};

export default Members;
