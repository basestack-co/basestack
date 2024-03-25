import React from "react";
import { useTheme } from "styled-components";
import { Text, Card, IconBox } from "@basestack/design-system";
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
  const theme = useTheme();

  return (
    <Card hasHoverAnimation p={theme.spacing.s5}>
      <IconBox icon="folder_open" mb={theme.spacing.s5} />
      <Text size="large">Documentation, Help and Support</Text>
      <TextLink
        data={[
          { text: "Read the" },
          { text: "Documentation", href: "/", target: "_blank" },
        ]}
      />
      <TextLink
        data={[
          { text: "Check out the" },
          { text: "SDK’s", href: "/", target: "_blank" },
        ]}
      />
      <TextLink
        data={[
          { text: "How to" },
          { text: "Contribute?", href: "/", target: "_blank" },
        ]}
      />
      <TextLink
        data={[
          { text: "Open an issue on" },
          { text: "Github", href: "/", target: "_blank" },
        ]}
      />
    </Card>
  );
};

export default LinksCard;
