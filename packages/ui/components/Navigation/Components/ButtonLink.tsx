// Components
import { Button, ButtonVariant } from "@basestack/design-system";
// Utils
import { rem } from "polished";
import { memo, type ReactNode } from "react";
import styled, { css } from "styled-components";
// Types
import type { SpaceProps } from "styled-system";
import type { ButtonType } from "../types";

interface ButtonLinkProps {
  isActive: boolean;
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  type: ButtonType;
  variant?: ButtonVariant;
  space?: SpaceProps;
}

export const ExternalLink = styled.a`
  text-decoration: none;
`;

export const ButtonContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  height: ${rem("64px")};
  ${({ isActive }) =>
    isActive &&
    css`
      &::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: ${({ theme }) => theme.colors.blue400};
      }
    `};
`;

const ButtonLink = ({
  href,
  isActive = false,
  children,
  onClick,
  type,
  variant,
  space,
}: ButtonLinkProps) => (
  <ButtonContainer isActive={isActive}>
    {type === "link" ? (
      <ExternalLink href={href} target="_blank" rel="noopener noreferrer">
        <Button as="div" variant={ButtonVariant.PrimaryNeutral}>
          {children}
        </Button>
      </ExternalLink>
    ) : (
      <Button
        onClick={onClick}
        variant={variant || ButtonVariant.PrimaryNeutral}
        {...space}
      >
        {children}
      </Button>
    )}
  </ButtonContainer>
);
export default memo(ButtonLink);
