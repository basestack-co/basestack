import styled, { css } from "styled-components";
import { space, position, layout, compose } from "styled-system";
import { rem } from "polished";
import { Variant } from "./types";

export const Container = styled.div<{
  hasHoverAnimation: boolean;
  variant: Variant;
}>`
  ${compose(space, position, layout)};
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  background-color: ${({ theme }) => theme.card.backgroundColor};
  border-radius: ${rem("6px")};

  ${({ hasHoverAnimation }) =>
    hasHoverAnimation &&
    css`
      transition: box-shadow 0.2s ease-in-out;
      &:hover {
        box-shadow: ${({ theme }) => theme.shadow.elevation4};
      }
    `};

  ${({ variant, theme }) =>
    variant === Variant.DANGER &&
    css`
      outline-offset: -1px;
      outline: 1px solid ${theme.colors[theme.isDarkMode ? "red500" : "red400"]};
    `}

  ${({ variant, theme }) =>
    variant === Variant.PRIMARY &&
    css`
      outline-offset: -1px;
      outline: 1px solid
        ${theme.colors[theme.isDarkMode ? "blue400" : "blue400"]};
    `}
`;
