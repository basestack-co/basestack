"use client";

import React from "react";
// Locales
import { useTranslations } from "next-intl";
// Store
import { useStore } from "store";
// Components
import { ButtonVariant, Card, IconBox, Text } from "@basestack/design-system";
import { EmptyStateWithAction} from "@basestack/ui";
import TextLink from "./TextLink";
// Styles
import { useTheme } from "styled-components";
import { ContentContainer, Header, Section } from "./styles";
// Utils
import { config } from "@basestack/utils";

const GetStarted = () => {
  const t = useTranslations("home");
  const theme = useTheme();

  const setIntegrationModalOpen = useStore(
    (state) => state.setIntegrationModalOpen,
  );

  return (
    <Section>
      <Header>
        <Text size="xLarge" mr={theme.spacing.s5}>
          {t("links.title")}
        </Text>
      </Header>
      <ContentContainer>
        <EmptyStateWithAction
          icon={{
            name: "downloading",
          }}
          title={t("links.sdks.title")}
          description={t("links.sdks.description")}
          button={{
            text: t("links.sdks.action"),
            onClick: () => setIntegrationModalOpen({ isOpen: true }),
            variant: ButtonVariant.Outlined,
          }}
        />
        <Card hasHoverAnimation p={theme.spacing.s5}>
          <IconBox icon="folder_open" mb={theme.spacing.s5} />
          <Text size="large" mb={theme.spacing.s2}>
            {t("links.external.title")}
          </Text>
          <TextLink
            text={t("links.external.read_the")}
            link={{
              text: t("links.external.docs"),
              href: config.urls.docs.flags.base,
              target: "_blank",
            }}
          />
          <TextLink
            text={t("links.external.check_out_the")}
            link={{
              text: t("links.external.sdks"),
              href: config.urls.docs.flags.sdk.base,
              target: "_blank",
            }}
          />
          <TextLink
            text={t("links.external.how_to")}
            link={{
              text: t("links.external.contribute"),
              href: config.urls.docs.contribute,
              target: "_blank",
            }}
          />
          <TextLink
            text={t("links.external.open_on")}
            link={{
              text: t("links.external.github"),
              href: config.urls.repo,
              target: "_blank",
            }}
            hasMarginBottom={false}
          />
        </Card>
      </ContentContainer>
    </Section>
  );
};

export default GetStarted;
