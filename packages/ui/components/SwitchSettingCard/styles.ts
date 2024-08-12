import styled, { css } from "styled-components";
import { transparentize } from "polished";

export const ContentContainer = styled.div<{ hasLabel: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ hasLabel, theme }) =>
    hasLabel &&
    css`
      @media screen and ${theme.device.max.sm} {
        flex-direction: column;
        align-items: initial;
        justify-content: initial;
      }
    `}
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 1px;
  z-index: 5;
  border-radius: 8px;
  background-color: ${({ theme }) =>
    transparentize(0.3, theme.colors[theme.isDarkMode ? "gray800" : "white"])};
`;

export const TagContainer = styled.div`
  display: inline-flex;
  z-index: 5;
  margin-right: ${({ theme }) => theme.spacing.s5};
`;

export const RightColumn = styled.div<{ hasLabel: boolean }>`
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.s5};
  flex-shrink: 0;
  ${({ hasLabel, theme }) =>
    hasLabel &&
    css`
      @media screen and ${({ theme }) => theme.device.max.sm} {
        margin-top: ${({ theme }) => theme.spacing.s5};
        margin-left: auto;
      }
    `}
`;
