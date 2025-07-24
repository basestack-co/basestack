"use client";

// Components
import {
  Button,
  ButtonVariant,
  Card,
  IconBox,
  Text,
} from "@basestack/design-system";
// Utils
import { config } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";
// Store
import { useStore } from "store";
// Styles
import { useTheme } from "styled-components";
import { ContentContainer, Header, Section } from "./styles";
import TextLink from "./TextLink";

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
        <Card p={theme.spacing.s5}>
          <IconBox icon="downloading" mb={theme.spacing.s5} />
          <Text size="medium" mb={theme.spacing.s2}>
            {t("links.sdks.title")}
          </Text>
          <Text muted size="small" mb={theme.spacing.s6}>
            {t("links.sdks.description")}
          </Text>
          <Button
            mt="auto"
            variant={ButtonVariant.Outlined}
            onClick={() => setIntegrationModalOpen({ isOpen: true })}
          >
            {t("links.sdks.action")}
          </Button>
        </Card>

        <Card hasHoverAnimation p={theme.spacing.s5}>
          <IconBox icon="folder_open" mb={theme.spacing.s5} />
          <Text size="medium" mb={theme.spacing.s2}>
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
