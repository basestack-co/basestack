import React, { memo, ReactNode } from "react";
import { rem } from "polished";
import Link from "next/link";
import styled, { css } from "styled-components";
import { Button, ButtonVariant } from "@basestack/design-system";

export interface ButtonLinkProps {
  /**
   * Set button link active
   */
  isActive: boolean;
  /**
   * Link href
   */
  href: string;
  /**
   * Set button link active
   */
  children: ReactNode;
  /**
   * Target blank external links
   */
  isExternal?: boolean;
}

export const ExternalLink = styled.a``;

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
}: ButtonLinkProps) => {
  const Anchor = isExternal ? ExternalLink : Link;
  const anchorProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : { passHref: true };

  return (
    <ButtonContainer isActive={isActive}>
      <Anchor href={href} {...anchorProps} style={{ textDecoration: "none" }}>
        <Button as="div" variant={ButtonVariant.PrimaryNeutral}>
          {children}
        </Button>
      </Anchor>
    </ButtonContainer>
  );
};

export default memo(ButtonLink);
