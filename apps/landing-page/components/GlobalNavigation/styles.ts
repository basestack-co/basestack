import styled, { css, createGlobalStyle } from "styled-components";
import { rem } from "polished";

export const GlobalStyle = createGlobalStyle<{ isMenuOpen: boolean }>`
    ${({ isMenuOpen }) =>
      isMenuOpen &&
      css`
        body {
          overflow: hidden;
        }
      `}
`;

const backgroundBlur = css`
  background: ${({ theme }) =>
    theme.isDarkMode ? "rgba(20, 20, 20, 0.7)" : "rgba(246, 246, 246, 0.7)"};
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
`;

export const Container = styled.nav.withConfig({
  shouldForwardProp: (prop) => !["hasBackdropFilter"].includes(prop),
})<{
  hasBackdropFilter: boolean;
}>`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: ${rem("64px")};
  padding: 0 ${({ theme }) => theme.spacing.s5};
  transition: all 0.2s ease-in;

  ${({ hasBackdropFilter, theme }) =>
    hasBackdropFilter
      ? backgroundBlur
      : css`
          background-color: ${theme.colors.gray50};
        `}
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: ${rem("1440px")};
`;

export const LeftColumn = styled.div`
  display: flex;
  align-items: center;
`;

export const List = styled.ul`
  display: flex;
  margin-left: ${({ theme }) => theme.spacing.s4};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    display: none;
  }
`;

export const ListItem = styled.li`
  display: flex;
`;

export const RightColumn = styled.div`
  display: flex;
  margin-left: auto;
`;
