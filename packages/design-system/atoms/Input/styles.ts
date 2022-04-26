import styled, { css } from "styled-components";
import { rem } from "polished";
import { space } from "styled-system";
import Icon from "../Icon";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input<{
  isDarker: boolean;
  size?: "small" | "normal";
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}>`
  ${space};
  border: none;
  background-color: ${({ theme, isDarker }) =>
    isDarker ? theme.colors.gray100 : theme.colors.gray50};
  height: ${({ size }) => (size === "normal" ? rem("44px") : rem("36px"))};
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
      padding-left: ${rem("48px")};
    `};

  ${({ hasRightIcon }) =>
    hasRightIcon &&
    css`
      padding-right: ${rem("48px")};
    `};
`;

export const LeftIcon = styled(Icon)`
  position: absolute;
  left: ${rem("16px")};
`;

export const RightIcon = styled(Icon)`
  position: absolute;
  right: ${rem("16px")};
`;
