"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "utils/trpc/react";
import { useTheme } from "styled-components";
import { toast } from "sonner";
import {
  Card,
  Button,
  ButtonVariant,
  Text,
  Avatar,
  IconBox,
} from "@basestack/design-system";
import { Body, Buttons, Container, Footer, Header, Wrapper } from "./styles";

const InvitePage = () => {
  const { spacing } = useTheme();
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
  const trpcUtils = api.useUtils();
  const acceptInvitation = api.team.acceptInvitation.useMutation();

  return (
    <Container>
      <Wrapper>
        <Card p={spacing.s5}>
          <Header>
            <Text size="small" muted>
              Today, April 10 2025
            </Text>
            <Text size="xLarge" fontWeight={400} mt={spacing.s1}>
              Pending Invite
            </Text>
          </Header>

          <Body>
            <Avatar
              src=""
              userName="Sandro Gee"
              alt="Sandro Gee"
              size="large"
            />

            <Text
              size="xxLarge"
              fontWeight={400}
              mt={spacing.s3}
              textAlign="center"
            >
              You have being invited to join the team
            </Text>
            <Text size="xxLarge" fontWeight={500}>
              {`"${token}"`}
            </Text>

            <IconBox icon="group_add" mt={spacing.s7} size="large" />
            <Text
              size="medium"
              fontWeight={400}
              muted
              mt={spacing.s3}
              textAlign="center"
            >
              6 from your team have already accepted
            </Text>
          </Body>

          <Footer>
            <Text size="small" fontWeight={400} muted>
              Your invitation expires in 7 days
            </Text>
            <Buttons>
              <Button
                variant={ButtonVariant.Outlined}
                onClick={() => undefined}
              >
                Decline
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                onClick={() =>
                  acceptInvitation.mutate(
                    { token },
                    {
                      onSuccess: async () => {
                        await trpcUtils.project.all.invalidate();
                        await trpcUtils.project.recent.invalidate();

                        toast.success(
                          "Successfully joined team, redirecting...",
                        );

                        router.push("/a");
                      },
                      onError: (error) => {
                        toast.error(error.message);
                      },
                    },
                  )
                }
              >
                Accept Invitation
              </Button>
            </Buttons>
          </Footer>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default InvitePage;
