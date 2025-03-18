import styled, { css } from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s5};
  justify-content: space-between;

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: 1fr;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
`;

const borderBgStyles = css`
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray800" : "gray100"]};
  border: 1px solid
    ${({ theme }) => theme.colors[theme.isDarkMode ? "gray700" : "gray200"]};
`;

const lineStyles = (isFirst = false, isLast = false) => css`
  ${isLast || isFirst
    ? css`
        background: linear-gradient(
          to ${isLast ? "bottom" : "top"},
          ${({ theme }) =>
            theme.colors[theme.isDarkMode ? "gray500" : "gray400"]},
          transparent
        );
      `
    : css`
        background-color: ${({ theme }) =>
          theme.colors[theme.isDarkMode ? "gray500" : "gray400"]};
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
        width: 2px;
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
        width: 2px;
        bottom: ${rem("-20px")};
        height: calc(50% - ${rem("4px")});
        ${lineStyles(isFirst, false)};
      }
    `}

  @media screen and ${({ theme }) => theme.device.max.md} {
    margin-right: ${({ theme }) => theme.spacing.s5};

    &::before,
    &::after {
      content: initial;
    }
  }
`;

export const NumberCircle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${rem("40px")};
  width: ${rem("40px")};
  border-radius: 50%;
  flex-shrink: 0;
  ${borderBgStyles};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${rem("8px")};
  overflow: hidden;
  height: ${rem("280px")};
  width: 100%;
  ${borderBgStyles};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
