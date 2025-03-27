import styled, { css } from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContentContainer = styled.div<{ order: string }>`
  display: flex;
  flex-direction: ${({ order }) =>
    order === "inverse" ? "row-reverse" : "row"};
  gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.md} {
    flex-direction: row;
  }
`;

const lineStyles = (isFirst = false, isLast = false) => css`
  ${isLast || isFirst
    ? css`
        background: linear-gradient(
          to ${isLast ? "bottom" : "top"},
          ${({ theme }) =>
            theme.colors[theme.isDarkMode ? "gray600" : "gray300"]},
          transparent
        );
      `
    : css`
        background-color: ${({ theme }) =>
          theme.colors[theme.isDarkMode ? "gray600" : "gray300"]};
      `};
`;

export const NumberContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isFirst", "isLast"].includes(prop),
})<{
  isLast: boolean;
  isFirst: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.s1};
  position: relative;

  ${({ isFirst, isLast }) =>
    !isFirst &&
    css`
      &::before {
        content: "";
        position: absolute;
        width: 1px;
        top: 0;
        height: calc(50% - ${rem("24px")});
        ${lineStyles(false, isLast)};
      }
    `}

  ${({ isLast, isFirst }) =>
    !isLast &&
    css`
      &::after {
        content: "";
        position: absolute;
        width: 1px;
        bottom: ${rem("-20px")};
        height: calc(50% - ${rem("4px")});
        ${lineStyles(isFirst, false)};
      }
    `}

  @media screen and ${({ theme }) => theme.device.max.sm} {
    position: absolute;
    top: -16px;
    left: -16px;
    z-index: 2;

    &::before,
    &::after {
      content: initial;
    }
  }
`;

const borderStyles = css`
  background: ${({ theme }) =>
    `linear-gradient(220deg, 
        ${theme.colors[theme.isDarkMode ? "gray900" : "gray50"]} 0%, 
        ${theme.colors[theme.isDarkMode ? "gray600" : "gray300"]} 30%, 
        ${theme.colors[theme.isDarkMode ? "gray700" : "gray200"]} 70%, 
        ${theme.colors[theme.isDarkMode ? "gray900" : "gray50"]} 100%)`};

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray900" : "gray50"]};
    border-radius: ${rem("7px")};
    z-index: 0;
  }
`;

export const NumberWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray900" : "gray50"]};
  justify-content: center;
  height: ${rem("40px")};
  width: ${rem("40px")};
  border-radius: ${rem("8px")};
  flex-shrink: 0;
  position: relative;
  ${borderStyles};

  & > * {
    z-index: 1;
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    height: ${rem("36px")};
    width: ${rem("36px")};
  }
`;

export const Placeholder = styled.div`
  flex: 1 0 0;
  height: 0;
  padding: ${({ theme }) => theme.spacing.s5};
  pointer-events: none;

  @media screen and ${({ theme }) => theme.device.max.md} {
    display: none;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 0 0;
  padding: ${({ theme }) => theme.spacing.s5};
  border-radius: ${rem("8px")};
  position: relative;
  ${borderStyles};
`;

export const TextContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

export const IconContainer = styled.div`
  display: inline-flex;
  z-index: 1;
  flex-shrink: 0;
  height: ${rem("30px")};
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    display: none;
  }
`;
