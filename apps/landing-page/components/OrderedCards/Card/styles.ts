import styled, { css } from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContentContainer = styled.div`
  display: flex;
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
  margin-right: ${({ theme }) => theme.spacing.s6};
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

  @media screen and ${({ theme }) => theme.device.max.md} {
    margin-right: ${({ theme }) => theme.spacing.s5};
  }

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
  border: 1px solid
    ${({ theme }) => theme.colors[theme.isDarkMode ? "gray700" : "gray200"]};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    height: ${rem("36px")};
    width: ${rem("36px")};
  }
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.s5};
  position: relative;
  border-radius: ${rem("8px")};

  background: ${({ theme }) =>
    `linear-gradient(220deg, 
        ${theme.colors[theme.isDarkMode ? "gray900" : "gray50"]} 0%, 
        ${theme.colors[theme.isDarkMode ? "gray700" : "gray200"]} 30%, 
        ${theme.colors[theme.isDarkMode ? "gray700" : "gray200"]} 70%, 
        ${theme.colors[theme.isDarkMode ? "gray900" : "gray50"]} 100%)`};

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray900" : "gray50"]};
    border-radius: ${rem("7px")};
    z-index: 0;
  }
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
