import styled, { css, createGlobalStyle } from "styled-components";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  IconButton,
} from "@basestack/design-system";
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

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const backgroundBlur = (isDarkMode: boolean) => css`
  background: ${isDarkMode
    ? "rgba(31, 31, 31, 0.6)"
    : "rgba(238, 238, 238, 0.7)"};
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
`;

export const Container = styled.nav<{
  isDarkMode: boolean;
  hasBackdropFilter: boolean;
}>`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: ${rem("80px")};
  padding: 0 ${({ theme }) => theme.spacing.s5};
  transition: all 0.2s ease-in;

  ${({ hasBackdropFilter, isDarkMode, theme }) =>
    hasBackdropFilter
      ? backgroundBlur(isDarkMode)
      : css`
          background-color: ${isDarkMode
            ? theme.colors.gray800
            : theme.colors.gray50};
        `}
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
`;

export const LeftColumn = styled.div`
  display: flex;
  align-items: center;
`;

export const List = styled.ul`
  display: flex;
  margin-left: ${({ theme }) => theme.spacing.s3};
`;

export const ListItem = styled.li`
  margin-right: ${({ theme }) => theme.spacing.s2};
`;

export const RightColumn = styled.div`
  display: flex;
  margin-left: auto;
`;

export const Logo = styled.div`
  display: inline-flex;
  justify-content: center;
  position: relative;
  height: ${rem("40px")};
  width: ${rem("40px")};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.black};

  &::before {
    content: "";
    position: absolute;
    bottom: ${rem("5px")};
    border-radius: 50%;
    height: ${rem("20px")};
    width: ${rem("20px")};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const PopupContainer = styled.div<{ isMenuOpen: boolean }>`
  position: fixed;
  z-index: 999;
  top: 79px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  ${flexColumn};
  align-items: center;
  justify-content: center;

  ${({ isMenuOpen }) =>
    !isMenuOpen &&
    css`
      pointer-events: none;
    `};
`;

export const PopupWrapper = styled.ul<{ isDarkMode: boolean }>`
  ${flexColumn};
  ${({ isDarkMode }) => backgroundBlur(isDarkMode)};
  padding: ${({ theme }) => theme.spacing.s3};
`;

export const PopupItem = styled.li`
  ${flexColumn};

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s3};
  }
`;

export const BurgerMenu = styled(IconButton)<{ isDarkMode: boolean }>`
  ${({ isDarkMode }) =>
    isDarkMode &&
    css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.gray300};
      transition: background-color 0.1s ease-in-out;

      &:hover {
        background-color: ${({ theme }) => theme.colors.gray700};
      }
    `}
`;
