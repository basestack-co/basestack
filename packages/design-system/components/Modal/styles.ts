import styled, { css, createGlobalStyle } from "styled-components";
import { transparentize, rem } from "polished";
import { Size } from "./types";

export const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const flexRowCenter = css`
  display: flex;
  align-items: center;
`;

export const Container = styled.div<{ expandMobile: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  ${flexColumn};
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.s5};

  ${({ expandMobile }) =>
    expandMobile &&
    css`
      @media screen and ${({ theme }) => theme.device.max.sm} {
        align-items: initial;
        justify-content: flex-end;
        padding: 0;
      }
    `};
`;

const handleSheetSize = (size: Size) => {
  switch (size) {
    default:
    case "small":
      return "576px";
    case "medium":
      return "768px";
    case "large":
      return "992px";
  }
};

export const Sheet = styled.div<{
  size: Size;
  minHeight: number;
  expandMobile: boolean;
}>`
  max-width: ${({ size }) => handleSheetSize(size)};
  width: 100%;
  ${flexColumn};
  min-height: ${({ minHeight }) => `${minHeight}px`};
  background-color: ${({ theme }) => theme.modal.backgroundColor};
  box-shadow: ${({ theme }) => theme.shadow.elevation4};
  border-radius: 4px;
  z-index: 1;

  ${({ expandMobile }) =>
    expandMobile &&
    css`
      @media screen and ${({ theme }) => theme.device.max.sm} {
        max-height: calc(100vh - ${({ theme }) => theme.spacing.s6});
      }
    `};
`;

export const Header = styled.div`
  height: ${rem("75px")};
  padding: 0 ${rem("20px")};
  ${flexRowCenter};
`;

export const Body = styled.div`
  padding: 0 ${rem("20px")} ${rem("20px")} ${rem("20px")};
  ${flexColumn};
`;

export const Footer = styled.div`
  padding: ${rem("20px")};
  ${flexRowCenter};
  justify-content: flex-end;
  margin-top: auto;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-color: ${({ theme }) => theme.modal.overlay.backgroundColor};
`;
