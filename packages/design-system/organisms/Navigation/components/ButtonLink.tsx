import React, { memo, ReactNode } from "react";
import { rem } from "polished";
import styled, { css } from "styled-components";
import { Button } from "../../../atoms";

export interface ButtonLinkProps {
  /**
   * Set button link active
   */
  isActive: boolean;
  /**
   * Set button link active
   */
  children: ReactNode;
  /**
   * Link href
   */
  href: string;
}

export const ButtonContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  height: ${rem("64px")};
  ${({ isActive }) =>
    isActive &&
    css`
      a {
        color: ${({ theme }) => theme.colors.blue400};
      }

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

const ButtonLink = ({ isActive = false, children, href }: ButtonLinkProps) => (
  <ButtonContainer isActive={isActive}>
    {/* @ts-ignore */}
    <Button href={href} as="a" variant="primaryNeutral">
      {children}
    </Button>
  </ButtonContainer>
);

export default memo(ButtonLink);
