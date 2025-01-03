import styled, { css } from "styled-components";
import { rem } from "polished";
import { space, compose, layout } from "styled-system";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "maxWidth",
})`
  ${compose(space, layout)};
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "hasError",
      "isDarker",
      "iconPlacement",
      "hasRightIcon",
      "hasLeftIcon",
    ].includes(prop),
})<{
  isDarker: boolean;
  format?: "small" | "normal";
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
  hasError: boolean;
  disabled: boolean;
}>`
  border: none;
  background-color: ${({ theme, isDarker, hasError }) =>
    hasError
      ? theme.input.error.backgroundColor
      : isDarker
        ? theme.input.isDarker.backgroundColor
        : theme.input.backgroundColor};
  height: ${({ format }) => (format === "normal" ? rem("44px") : rem("36px"))};
  border-radius: ${rem("4px")};
  font-size: ${rem("14px")};
  font-weight: 400;
  width: 100%;
  padding: 0 ${rem("16px")};
  color: ${({ theme }) => theme.input.color};

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder.color};
  }

  &:focus {
    outline: 2px solid
      ${({ theme, hasError }) =>
        hasError ? theme.input.error.focus.outline : theme.input.focus.outline};
  }

  ${({ hasLeftIcon }) =>
    hasLeftIcon &&
    css`
      padding-left: ${rem("44px")};
    `};

  ${({ hasRightIcon }) =>
    hasRightIcon &&
    css`
      padding-right: ${rem("44px")};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `};
`;

export const IconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "iconPlacement",
})<{ iconPlacement?: "left" | "right" }>`
  display: inline-flex;
  position: absolute;
  left: ${({ iconPlacement }) =>
    iconPlacement === "left" ? rem("12px") : "initial"};
  right: ${({ iconPlacement }) =>
    iconPlacement === "right" ? rem("12px") : "initial"};
`;
