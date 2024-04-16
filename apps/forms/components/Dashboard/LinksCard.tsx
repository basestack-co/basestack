import React from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Text, Card, IconBox } from "@basestack/design-system";
// Utils
import { config } from "@basestack/utils";
// Styles
import { useTheme } from "styled-components";
import { Box, StyledLink } from "./styles";

interface TextLinkProps {
  data: Array<{
    text: string;
    href?: string;
    target?: string;
  }>;
}

const TextLink = ({ data }: TextLinkProps) => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" mt={theme.spacing.s2}>
      {data.map(({ text, href, target }, index) => {
        const props = target ? { target: target } : {};
        return (
          <Text key={index} muted size="small">
            {!!href ? (
              <StyledLink href={href} {...props}>
                {text}
              </StyledLink>
            ) : (
              <>{text}&nbsp;</>
            )}
          </Text>
        );
      })}
    </Box>
  );
};

const LinksCard = () => {
  const { t } = useTranslation("home");
  const theme = useTheme();

  return (
    <Card hasHoverAnimation p={theme.spacing.s5}>
      <IconBox icon="folder_open" mb={theme.spacing.s5} />
      <Text size="large">{t("links.external.title")}</Text>
      <TextLink
        data={[
          { text: t("links.external.read_the") },
          {
            text: t("links.external.docs"),
            href: config.urls.docs.forms.base,
            target: "_blank",
          },
        ]}
      />
      <TextLink
        data={[
          { text: t("links.external.check_out_the") },
          {
            text: t("links.external.sdks"),
            href: config.urls.docs.forms.sdk.base,
            target: "_blank",
          },
        ]}
      />
      <TextLink
        data={[
          { text: t("links.external.how_to") },
          {
            text: t("links.external.contribute"),
            href: config.urls.docs.contribute,
            target: "_blank",
          },
        ]}
      />
      <TextLink
        data={[
          { text: t("links.external.open_on") },
          {
            text: t("links.external.github"),
            href: config.urls.repo,
            target: "_blank",
          },
        ]}
      />
    </Card>
  );
};

export default LinksCard;
