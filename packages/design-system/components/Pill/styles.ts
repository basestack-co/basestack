import styled from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";

export const Container = styled.button<{ isSelected: boolean }>`
  border: none;
  cursor: pointer;
  ${space};
  display: inline-flex;
  align-items: center;
  height: ${rem("36px")};
  border-radius: ${rem("18px")};
  padding: 0 ${rem("12px")};
  background-color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.pill.selected.backgroundColor
      : theme.pill.backgroundColor};
  transition: background-color 0.1s ease-in-out;

  &:hover:not(:active) {
    background-color: ${({ theme, isSelected }) =>
      isSelected
        ? theme.pill.hover.selected.backgroundColor
        : theme.pill.hover.backgroundColor};
  }
`;
