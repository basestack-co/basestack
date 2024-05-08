import React, { memo, ReactNode } from "react";
import { rem } from "polished";
import styled, { css } from "styled-components";
import { Button, ButtonVariant } from "@basestack/design-system";

export interface ButtonLinkProps {
  isActive: boolean;
  href?: string;
  children: ReactNode;
  isExternal?: boolean;
  onClick?: () => void;
}

export const ExternalLink = styled.a`
  text-decoration: none;
`;

export const ButtonContainer = styled.div<{ isActive: boolean }>`
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
  isExternal = false,
  onClick,
}: ButtonLinkProps) => (
  <ButtonContainer isActive={isActive}>
    {isExternal ? (
      <ExternalLink href={href} target="_blank" rel="noopener noreferrer">
        <Button as="div" variant={ButtonVariant.PrimaryNeutral}>
          {children}
        </Button>
      </ExternalLink>
    ) : (
      <Button onClick={onClick} variant={ButtonVariant.PrimaryNeutral}>
        {children}
      </Button>
    )}
  </ButtonContainer>
);
export default memo(ButtonLink);
