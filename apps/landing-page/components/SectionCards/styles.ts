import styled, { css } from "styled-components";
import { rem } from "polished";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
`;

export const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.s5};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${rem("1400px")};
  width: 100%;
  margin: 0 auto;
`;

export const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s8};
`;

export const Row = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isEven"].includes(prop),
})<{ isEven: boolean }>`
  display: flex;
  flex-direction: ${({ isEven }) => (isEven ? "row" : "row-reverse")};
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s8};

  @media screen and ${({ theme }) => theme.device.max.md} {
    flex-direction: column-reverse;
    gap: ${({ theme }) => theme.spacing.s5};
  }
`;

export const Image = styled.img.withConfig({
  shouldForwardProp: (prop) => !["isEven", "isFlatMode"].includes(prop),
})<{ isEven: boolean; isFlatMode?: boolean }>`
  width: 100%;
  height: auto;

  ${({ isFlatMode, isEven, theme }) =>
    !isFlatMode &&
    css`
      border: 1px solid
        ${theme.isDarkMode
          ? theme.horizontalRule.backgroundColor
          : theme.horizontalRule.backgroundColor};

      ${isEven
        ? css`
            border-top-right-radius: ${rem("8px")};
          `
        : css`
            border-top-left-radius: ${rem("8px")};
          `};
    `}
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 400px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TextWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isEven"].includes(prop),
})<{ isEven: boolean }>`
  padding: ${({ isEven }) =>
    isEven ? `0 0 0 ${rem("30px")}` : `0 ${rem("30px")} 0 0`};

  @media screen and ${({ theme }) => theme.device.max.md} {
    padding: 0;
  }
`;
