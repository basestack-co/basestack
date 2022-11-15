import React from "react";
import { useTheme } from "styled-components";
import { Text } from "@basestack/design-system";
import { StyledLink } from "./styles";

interface TextLinkProps {
  text: string;
  hasMarginBottom?: boolean;
  link: {
    text: string;
    href: string;
  };
}

const TextLink = ({ text, link, hasMarginBottom = true }: TextLinkProps) => {
  const theme = useTheme();

  return (
    <Text muted size="small" mb={hasMarginBottom ? theme.spacing.s2 : 0}>
      {text} <StyledLink href={link.href}>{link.text}</StyledLink>
    </Text>
  );
};

export default TextLink;
