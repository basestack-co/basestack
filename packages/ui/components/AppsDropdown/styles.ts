import { neutralButtonStyles } from "@basestack/design-system";
import { rem } from "polished";
import styled, { css } from "styled-components";
import {
  type PositionProps,
  position,
  type SpaceProps,
  space,
} from "styled-system";

export const Container = styled.div<SpaceProps>`
  display: flex;
  ${space};
`;

export const Dropdown = styled.div<PositionProps>`
  ${position};
  background-color: ${({ theme }) => theme.popup.backgroundColor};
  box-shadow: ${({ theme }) => theme.shadow.elevation6};
  border-radius: 4px;
  width: ${rem("280px")};
  z-index: ${({ theme }) => theme.zIndex.popup};
  padding: ${({ theme }) => theme.spacing.s1};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s1};
  }
`;

export const StyledButton = styled.button<{ isActive: boolean }>`
  ${neutralButtonStyles};
  padding: ${({ theme }) => theme.spacing.s2} ${({ theme }) => theme.spacing.s2};

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.button.neutral.hover.backgroundColor};
      cursor: initial;
      pointer-events: none;
    `};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: ${({ theme }) => theme.spacing.s3};
`;
