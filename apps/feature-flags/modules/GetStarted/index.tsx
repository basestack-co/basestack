import React from "react";
import { useTheme } from "styled-components";
import {
  Text,
  HorizontalRule,
  Icon,
  ButtonVariant,
  Card,
  IconBox,
} from "@basestack/design-system";
import { Container, ContentContainer, ContentWrapper } from "./styles";

import GetStartedCard from "./GetStartedCard";
import TextLink from "./TextLink";

const GetStarted = () => {
  const theme = useTheme();

  return (
    <Container>
      <Text size="xLarge">Let’s get started</Text>
      <Text muted size="small" mb={theme.spacing.s5}>
        Follow the steps below to start using Moonflags
      </Text>
      <ContentContainer>
        <ContentWrapper>
          <GetStartedCard
            icon={{
              name: "downloading",
              color: "green",
            }}
            title="Install our SDK"
            description="Integrate Moonflags into your Javascript, React, Go, PHP. More languages are coming soon!"
            button={{
              text: "View Instructions",
              onClick: () => console.log("instructions"),
              variant: ButtonVariant.Tertiary,
            }}
          />
          <GetStartedCard
            icon={{
              name: "flag",
              color: "blue",
            }}
            title="Create your first feature"
            description="Create a feature within Moonflags. Use features to toggle app behavior, do gradual rollouts, and run A/B testing."
            button={{
              text: "Create Feature Flag",
              onClick: () => console.log("instructions"),
              variant: ButtonVariant.Primary,
            }}
          />
          <GetStartedCard
            icon={{
              name: "groups",
              color: "purple",
            }}
            title="Invite team"
            description="Invite teammates to your account."
            button={{
              text: "Invite Team",
              onClick: () => console.log("instructions"),
              variant: ButtonVariant.Tertiary,
            }}
          />
        </ContentWrapper>
        <Card hasHoverAnimation p={theme.spacing.s5}>
          <IconBox icon="folder_open" color="gray" />
          <Text size="large" mb={theme.spacing.s2}>
            Documentation, help and support
          </Text>
          <TextLink text="Read our" link={{ text: "user guide", href: "/" }} />
          <TextLink
            text="Watch a quick"
            link={{ text: "video tour", href: "/" }}
          />
          <TextLink
            text="View docs for our"
            link={{ text: "SDK’s", href: "/" }}
          />
          <TextLink
            text=" Open an issue on"
            link={{ text: "Github", href: "/" }}
            hasMarginBottom={false}
          />
          <HorizontalRule my={theme.spacing.s5} />
          <Text size="large" mb={theme.spacing.s2}>
            Other Links
          </Text>
          <TextLink text="Join us on" link={{ text: "Slack", href: "/" }} />
          <TextLink
            text="Read our"
            link={{ text: "Docs", href: "/" }}
            hasMarginBottom={false}
          />
          <HorizontalRule my={theme.spacing.s5} />
          <Text size="large" mb={theme.spacing.s2}>
            Have questions?
          </Text>
          <TextLink
            text="Talk to us in our"
            link={{ text: "Slack channel", href: "/" }}
            hasMarginBottom={false}
          />
        </Card>
      </ContentContainer>
    </Container>
  );
};

export default GetStarted;
