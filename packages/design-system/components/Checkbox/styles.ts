import styled, { css } from "styled-components";
import { rem } from "polished";
import { tertiaryButtonStyles } from "../Button";
import { Variant } from "./types";

export const Container = styled.label<{ variant: Variant }>`
  display: flex;
  position: relative;
  cursor: pointer;
  ${({ variant }) =>
    variant === "button" &&
    css`
      ${tertiaryButtonStyles};
      height: ${rem("36px")};
      padding: 0 ${rem("12px")};
      font-size: ${rem("14px")};
    `};
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const StyledCheckbox = styled.div<{
  checked: boolean;
  variant: Variant;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ checked, theme }) =>
    checked
      ? theme.checkbox.checked.backgroundColor
      : theme.checkbox.backgroundColor};
  border: 2px solid ${({ theme }) => theme.checkbox.border};
  border-radius: 4px;
  transition: all 0.1s ease-in-out;

  ${({ variant }) =>
    variant === "button"
      ? css`
          width: ${rem("20px")};
          height: ${rem("20px")};
          border-color: ${({ theme }) => theme.checkbox.button.border};
        `
      : css`
          width: ${rem("22px")};
          height: ${rem("22px")};
          &:hover {
            border-color: ${({ theme }) => theme.checkbox.hover.border};
          }
        `};

  ${({ checked, theme }) =>
    checked &&
    css`
      border-color: ${theme.checkbox.checked.border};
    `};
`;
