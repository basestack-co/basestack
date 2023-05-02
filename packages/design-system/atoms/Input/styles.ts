import styled, { css } from "styled-components";
import { rem } from "polished";
import { space, compose, layout } from "styled-system";
import Icon from "../Icon";

export const Container = styled.div`
  ${compose(space, layout)};
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input<{
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
      ? theme.colors.red50
      : isDarker
      ? theme.colors.gray100
      : theme.colors.gray50};
  height: ${({ format }) => (format === "normal" ? rem("44px") : rem("36px"))};
  border-radius: ${rem("4px")};
  font-size: ${rem("14px")};
  font-weight: 400;
  width: 100%;
  padding: 0 ${rem("16px")};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  &:focus {
    outline: 2px solid
      ${({ theme, hasError }) =>
        hasError ? theme.colors.red200 : theme.colors.black};
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

export const LeftIcon = styled(Icon)`
  position: absolute;
  left: ${rem("12px")};
`;

export const RightIcon = styled(Icon)`
  position: absolute;
  right: ${rem("12px")};
`;
