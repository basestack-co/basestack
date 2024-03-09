import styled, { css } from "styled-components";
import { rem } from "polished";

export const Container = styled.label`
  display: flex;
  position: relative;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${rem("22px")};
  height: ${rem("22px")};
  background: ${({ checked, theme }) =>
    checked
      ? theme.checkbox.checked.backgroundColor
      : theme.checkbox.backgroundColor};
  border: 2px solid ${({ theme }) => theme.checkbox.border};
  border-radius: 4px;
  transition: all 200ms ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.checkbox.hover.border};
  }

  ${({ checked, theme }) =>
    checked &&
    css`
      border-color: ${theme.checkbox.checked.border};
    `};
`;
