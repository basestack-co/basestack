import styled, { css } from "styled-components";
import { rem } from "polished";

export const CardWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto minmax(0, 2fr) 2fr minmax(0, 1fr) auto auto;
  grid-gap: ${({ theme }) => theme.spacing.s5};
`;

export const Labels = styled.div`
  display: flex;
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 44px;
  justify-content: flex-end;
`;

export const Label = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{
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
  &:not(:first-child) {
    margin-left: -4px;
  }

  &:hover {
    z-index: 10;
  }
`;
