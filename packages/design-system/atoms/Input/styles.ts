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
}>`
  border: none;
  background-color: ${({ theme, isDarker }) =>
    isDarker ? theme.colors.gray100 : theme.colors.gray50};
  height: ${({ format }) => (format === "normal" ? rem("44px") : rem("36px"))};
  border-radius: ${rem("4px")};
  font-size: ${rem("14px")};
  font-weight: 400;
  width: 100%;
  padding: 0 ${rem("16px")};
  color: ${({ theme }) => theme.colors.gray500};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
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
`;

export const LeftIcon = styled(Icon)`
  position: absolute;
  left: ${rem("12px")};
`;

export const RightIcon = styled(Icon)`
  position: absolute;
  right: ${rem("12px")};
`;