import styled, { css } from "styled-components";
import { rem } from "polished";

export const Card = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["p", "bg", "transitionBg", "isFlatMode"].includes(prop),
})<{
  p?: string | number;
  bg?: string;
  transitionBg?: boolean;
  isFlatMode?: boolean;
}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
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

  ${({ isFlatMode, theme, bg }) =>
    !isFlatMode &&
    css`
      background-color: ${bg
        ? bg
        : theme.isDarkMode
          ? theme.colors.gray800
          : theme.colors.white};
      border-radius: ${rem("8px")};
      box-shadow: ${theme.shadow.elevation3};
    `}
`;
