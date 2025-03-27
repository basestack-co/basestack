import styled, { createGlobalStyle, css } from "styled-components";
import { rem } from "polished";

export const GlobalStyle: any = createGlobalStyle`
    body {
        overflow: hidden;
    }
`;

const backgroundBlur = css`
  background: ${({ theme }) =>
    theme.isDarkMode ? "rgba(20, 20, 20, 0.7)" : "rgba(246, 246, 246, 0.7)"};
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
`;

export const PopupContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>`
  position: fixed;
  z-index: 1001;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      pointer-events: none;
    `};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${backgroundBlur};
  padding: ${rem("24px")} ${({ theme }) => theme.spacing.s3};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s6};
  }
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s1};
  }
`;
