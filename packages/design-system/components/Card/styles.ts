import { rem } from "polished";
import styled, { css, type DefaultTheme } from "styled-components";
import { color, compose, layout, position, space } from "styled-system";
import { Variant } from "./types";

const getOutlineColor = (theme: DefaultTheme, variant: Variant) => {
  const colors = {
    [Variant.PRIMARY]: theme.card.variant.primary.border,
    [Variant.DANGER]: theme.card.variant.danger.border,
    [Variant.SUCCESS]: theme.card.variant.success.border,
    [Variant.WARNING]: theme.card.variant.warning.border,
    [Variant.DEFAULT]: "transparent",
  };

  return colors[variant];
};

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hasHoverAnimation",
})<{
  hasHoverAnimation: boolean;
  variant: Variant;
}>`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  background-color: ${({ theme }) => theme.card.backgroundColor};
  border-radius: ${rem("6px")};
  ${compose(space, position, layout, color)};

  ${({ hasHoverAnimation }) =>
    hasHoverAnimation &&
    css`
      transition: box-shadow 0.2s ease-in-out;

      &:hover {
        box-shadow: ${({ theme }) => theme.shadow.elevation4};
      }
    `};

  ${({ variant, theme }) =>
    variant !== Variant.DEFAULT &&
    css`
      outline-offset: -1px;
      outline: 1px solid ${getOutlineColor(theme, variant)};
    `}
`;
