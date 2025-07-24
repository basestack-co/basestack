import { rem } from "polished";
import styled, { css } from "styled-components";
import { space } from "styled-system";
import Text from "../Text";
import type { Breakpoint } from "./types";

export const Container = styled.div`
  ${space};
  background-color: ${({ theme }) => theme.table.backgroundColor};
  padding: ${({ theme }) => theme.spacing.s5};
  border-radius: 4px;
  position: relative;
`;

export const StyledRow = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "numberOfColumns",
      "hasSmallCol",
      "isHeader",
      "isResponsive",
      "breakpoint",
    ].includes(prop),
})<{
  numberOfColumns: number;
  hasSmallCol: boolean;
  isHeader?: boolean;
  isResponsive: boolean;
  breakpoint: Breakpoint;
}>`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.s5};
  ${({ hasSmallCol, numberOfColumns }) =>
    hasSmallCol
      ? css`
          grid-template-columns:
            repeat(${numberOfColumns}, minmax(0, 1fr))
            ${rem("32px")};
        `
      : css`
          grid-template-columns: repeat(${numberOfColumns}, minmax(0, 1fr));
        `}
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.table.border};
  }

  ${({ isResponsive, isHeader, theme, breakpoint }) =>
    isResponsive &&
    css`
      @media screen and ${theme.device.max[breakpoint]} {
        display: flex;
        flex-direction: column;

        &:not(:last-child) {
          border-bottom: none;
        }

        ${
          isHeader &&
          css`
          display: none;
        `
        }
      }
    `}
`;

export const Col = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["isResponsive", "isSmallCol", "breakpoint"].includes(prop),
})<{
  isResponsive: boolean;
  isSmallCol?: boolean;
  breakpoint: Breakpoint;
}>`
  height: ${rem("46px")};
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ isResponsive, theme, isSmallCol, breakpoint }) =>
    isResponsive &&
    css`
      @media screen and ${theme.device.max[breakpoint]} {
        height: initial;

        ${
          isSmallCol &&
          css`
          position: absolute;
          right: ${theme.spacing.s3};
          top: ${theme.spacing.s3};
        `
        }
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

export const MobileLabel = styled(Text).withConfig({
  shouldForwardProp: (prop) => !["breakpoint"].includes(prop),
})<{
  breakpoint: Breakpoint;
}>`
  @media screen and ${({ theme, breakpoint }) => theme.device.min[breakpoint]} {
    display: none;
  }
`;
