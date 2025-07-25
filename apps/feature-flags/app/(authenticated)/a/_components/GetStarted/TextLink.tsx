import { Text } from "@basestack/design-system";
import { useTheme } from "styled-components";
import { StyledLink } from "./styles";

interface TextLinkProps {
  text: string;
  hasMarginBottom?: boolean;
  link: {
    text: string;
    href: string;
    target?: string;
  };
}

const TextLink = ({ text, link, hasMarginBottom = true }: TextLinkProps) => {
  const theme = useTheme();

  return (
    <Text muted size="small" mb={hasMarginBottom ? theme.spacing.s2 : 0}>
      {text}{" "}
      <StyledLink
        href={link.href}
        {...(link?.target
          ? {
              target: link.target,
            }
          : {})}
      >
        {link.text}
      </StyledLink>
    </Text>
  );
};

export default TextLink;
