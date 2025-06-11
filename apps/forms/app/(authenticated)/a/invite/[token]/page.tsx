"use client";

import { useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";
// Utils
import dayjs from "dayjs";
// Components
import {
  Card,
  Button,
  ButtonVariant,
  Text,
  Avatar,
  IconBox,
} from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
import { Body, Buttons, Container, Footer, Header, Wrapper } from "./styles";

const InvitePage = () => {
  const t = useTranslations("invite");
  const { spacing } = useTheme();
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
  const trpcUtils = api.useUtils();

  const { data, isLoading, isError, error, ...rest } =
    api.teamInvites.byToken.useQuery(
      { token },
      {
        enabled: !!token,
        retry: 1,
      },
    );

  const acceptInvitation = api.teamMembers.create.useMutation();
  const removeInvite = api.teamInvites.delete.useMutation();

  const calculateExpiration = useCallback(() => {
    let expirationMessage = t("team.expires-at.not-available");

    if (data?.expiresAt) {
      const expiryDate = dayjs(data.expiresAt);
      const now = dayjs();

      if (expiryDate.isBefore(now)) {
        expirationMessage = t("team.expires-at.expired");
      } else {
        const relativeTimeString = expiryDate.fromNow();
        expirationMessage = t("team.expires-at.message", {
          date: relativeTimeString,
        });
      }
    }

    return expirationMessage;
  }, [data?.expiresAt, t]);

  const onAccept = useCallback(() => {
    acceptInvitation.mutate(
      { token },
      {
        onSuccess: async () => {
          await trpcUtils.teams.list.invalidate();

          toast.success(t("team.toast.join.success"));

          router.push("/a");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }, [acceptInvitation, router, t, token, trpcUtils.teams.list]);

  const onDecline = useCallback(() => {
    if (data?.invitationId) {
      removeInvite.mutate(
        {
          inviteId: data?.invitationId,
        },
        {
          onSuccess: async () => {
            await trpcUtils.teams.list.invalidate();
            toast.success(t("team.toast.decline.success"));

            router.push("/a");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    }
  }, [data?.invitationId, removeInvite, router, t, trpcUtils.teams.list]);

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(error?.message ?? "");
      setTimeout(() => router.push("/a"), 0);
    }
  }, [error?.message, isError, isLoading, router]);

  if (isLoading || isError) return null;

  return (
    <Container>
      <Wrapper>
        <Card p={spacing.s5}>
          <Header>
            <Text size="small" muted>
              {data?.createdAt
                ? dayjs(data.createdAt).format("dddd, MMMM D YYYY")
                : t("team.created-at.not-available")}
            </Text>
            <Text size="xLarge" fontWeight={400} mt={spacing.s1}>
              {t("team.title")}
            </Text>
          </Header>

          <Body>
            <Avatar
              src=""
              userName={data?.teamName ?? ""}
              alt={`Profile image for ${data?.teamName ?? "team"}`}
              size="large"
            />

            <Text
              size="xxLarge"
              fontWeight={400}
              mt={spacing.s3}
              textAlign="center"
            >
              {t("team.description")}
            </Text>
            <Text size="xxLarge" fontWeight={500}>
              {t("team.name", { name: data?.teamName ?? "" })}
            </Text>

            <IconBox icon="group_add" mt={spacing.s7} size="large" />
            <Text
              size="medium"
              fontWeight={400}
              muted
              mt={spacing.s3}
              textAlign="center"
            >
              {t("team.count", { count: data?.existingMemberCount ?? 0 })}
            </Text>
          </Body>

          {!isError && (
            <Footer>
              <Text size="small" fontWeight={400} muted>
                {calculateExpiration()}
              </Text>
              <Buttons>
                <Button variant={ButtonVariant.Outlined} onClick={onDecline}>
                  {t("team.action.decline")}
                </Button>
                <Button variant={ButtonVariant.Primary} onClick={onAccept}>
                  {t("team.action.accept")}
                </Button>
              </Buttons>
            </Footer>
          )}
        </Card>
      </Wrapper>
    </Container>
  );
};

export default InvitePage;
