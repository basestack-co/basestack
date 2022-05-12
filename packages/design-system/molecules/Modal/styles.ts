import styled, { css, createGlobalStyle } from "styled-components";
import { transparentize, rem } from "polished";

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

export const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  ${flexColumn};
  align-items: center;
  justify-content: center;
`;

export const Sheet = styled.div`
  max-width: 500px;
  width: 100%;

  ${flexColumn};
  height: 300px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.elevation4};
  border-radius: 4px;
  z-index: 1;
`;

export const Header = styled.div`
  height: ${rem("75px")};
  padding: 0 ${rem("20px")};
  ${flexRowCenter};
`;

export const Body = styled.div`
  padding: 0 ${rem("20px")};
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
  background-color: ${({ theme }) => transparentize("0.5", theme.colors.black)};
`;
