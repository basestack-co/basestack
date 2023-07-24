import styled, { css } from "styled-components";
import { rem } from "polished";

export const CardWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto minmax(0, 2fr) 2fr minmax(0, 1fr) auto;
  grid-gap: ${({ theme }) => theme.spacing.s5};
`;

export const Labels = styled.div`
  display: flex;
`;

export const Label = styled.div<{
  isActive: boolean;
}>`
  height: ${rem("14px")};
  width: ${rem("14px")};
  border: 1px solid
    ${({ theme }) => theme.colors[theme.isDarkMode ? "gray800" : "white"]};
  border-radius: 50%;
  flex-shrink: 0;

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: ${({ theme }) =>
            theme.colors[theme.isDarkMode ? "green300" : "green400"]};
        `
      : css`
          background-color: ${({ theme }) =>
            theme.colors[theme.isDarkMode ? "gray600" : "gray300"]};
        `};
`;

export const PopupWrapper = styled.div`
  height: ${rem("32px")};
  width: ${rem("32px")};
`;

export const TooltipContainer = styled.div<{ index: number; length: number }>`
  z-index: ${({ length, index }) => length - index};

  &:not(:first-child) {
    transform: ${({ index }) => `translateX(-${index * 4}px)`};
  }

  &:hover {
    z-index: ${({ length }) => length + 1};
  }
`;
