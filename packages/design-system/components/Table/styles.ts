import styled, { css } from "styled-components";
import Text from "../Text";
import { space } from "styled-system";
import { rem } from "polished";

export const Container = styled.div`
  ${space};
  background-color: ${({ theme }) => theme.table.backgroundColor};
  padding: ${({ theme }) => theme.spacing.s5};
  border-radius: 4px;
  position: relative;
`;

export const StyledRow = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["numberOfColumns", "hasSmallCol", "isHeader", "isResponsive"].includes(
      prop,
    ),
})<{
  numberOfColumns: number;
  hasSmallCol: boolean;
  isHeader?: boolean;
  isResponsive: boolean;
}>`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.s5};
  ${({ hasSmallCol, numberOfColumns }) =>
    hasSmallCol
      ? css`
          grid-template-columns:
            repeat(${numberOfColumns}, minmax(0, 1fr))
            36px;
        `
      : css`
          grid-template-columns: repeat(${numberOfColumns}, minmax(0, 1fr));
        `}
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.table.border};
  }

  ${({ isResponsive, isHeader, theme }) =>
    isResponsive &&
    css`
      @media screen and ${theme.device.max.lg} {
        display: flex;
        flex-direction: column;

        &:not(:last-child) {
          border-bottom: none;
        }

        ${isHeader &&
        css`
          display: none;
        `}
      }
    `}
`;

export const Col = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isResponsive", "isSmallCol"].includes(prop),
})<{
  isResponsive: boolean;
  isSmallCol?: boolean;
}>`
  height: ${rem("46px")};
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ isResponsive, theme, isSmallCol }) =>
    isResponsive &&
    css`
      @media screen and ${theme.device.max.lg} {
        height: initial;

        ${isSmallCol &&
        css`
          position: absolute;
          right: ${theme.spacing.s3};
          top: ${theme.spacing.s3};
        `}
      }
    `}
`;

export const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.table.link.color};
  }
`;

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
`;

export const PopupWrapper = styled.div`
  height: ${rem("32px")};
  width: ${rem("32px")};
`;

export const MobileLabel = styled(Text)`
  @media screen and ${({ theme }) => theme.device.min.lg} {
    display: none;
  }
`;
