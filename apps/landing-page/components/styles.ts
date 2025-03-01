import styled, { css } from "styled-components";
import { rem } from "polished";

export const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => !["p", "bg", "transitionBg"].includes(prop),
})<{
  p?: string | number;
  bg?: string;
  transitionBg?: boolean;
}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  background-color: ${({ theme, bg }) =>
    bg ? bg : theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  border-radius: ${rem("8px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  padding: ${({ p, theme }) =>
    p !== undefined && p !== null
      ? typeof p === "number"
        ? `${p}px`
        : p
      : theme.spacing.s5};

  ${({ transitionBg }) =>
    transitionBg &&
    css`
      transition: background-color 0.2s ease-in-out;
    `};
`;

export const Label = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s4};
  padding: 0 ${({ theme }) => theme.spacing.s2};
  height: ${rem("28px")};
  border-radius: ${rem("4px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
`;
