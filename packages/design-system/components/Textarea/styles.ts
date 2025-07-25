import { rem } from "polished";
import styled, { css } from "styled-components";
import { space } from "styled-system";

export const StyledTextarea = styled.textarea.withConfig({
  shouldForwardProp: (prop) =>
    !["hasError", "isDarker", "maxlength"].includes(prop),
})<{
  isDarker: boolean;
  hasError: boolean;
  disabled: boolean;
}>`
  ${space};
  border: none;
  background-color: ${({ theme, isDarker, hasError }) =>
    hasError
      ? theme.textarea.error.backgroundColor
      : isDarker
        ? theme.textarea.isDarker.backgroundColor
        : theme.textarea.backgroundColor};
  min-height: ${rem("150px")};
  max-height: ${rem("500px")};
  min-width: 100%;
  max-width: 100%;
  border-radius: ${rem("4px")};
  font-size: ${rem("14px")};
  font-weight: 400;
  width: 100%;
  padding: ${rem("16px")};
  color: ${({ theme }) => theme.textarea.color};

  &::placeholder {
    color: ${({ theme }) => theme.textarea.placeholder.color};
  }

  &:focus {
    outline: 2px solid
      ${({ theme, hasError }) =>
        hasError
          ? theme.textarea.error.focus.outline
          : theme.textarea.focus.outline};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `};
`;
