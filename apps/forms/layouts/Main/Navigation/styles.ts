import styled, { createGlobalStyle, css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { rem, transparentize } from "polished";
import { scrollbar } from "@basestack/design-system/styles";

// Desktop Navigation
export const DesktopContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.navigation};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray800" : "white"]};
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  height: ${rem("64px")};
  padding: 0 ${({ theme }) => theme.spacing.s5};
`;

const desktopFlexCenter = css`
  display: flex;
  align-items: center;
`;

export const DesktopList = styled.ul<SpaceProps>`
  ${space};
  ${desktopFlexCenter};
`;

export const DesktopListItem = styled.li<SpaceProps>`
  ${space};
`;

export const LogoContainer = styled.div`
  ${desktopFlexCenter};
  position: relative;
  padding-right: ${({ theme }) => theme.spacing.s4};
  margin-right: ${({ theme }) => theme.spacing.s1};
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    height: 20px;
    right: -1px;
    width: 2px;
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray600" : "gray100"]};
  }
`;

// Mobile Navigation

export const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const flexCenter = css`
  display: flex;
  align-items: center;
`;

export const Container = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.navigationDrawer};
  width: 100%;
  max-width: ${rem("320px")};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray800" : "white"]};
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
`;

export const ContentContainer = styled.div`
  ${flexColumn};
  flex-grow: 1;
  overflow-y: auto;
`;

export const BackDropCover = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => transparentize(0.7, theme.colors.black)};
  z-index: ${({ theme }) => theme.zIndex.backDropCover};
`;

export const Header = styled.div`
  ${flexCenter};
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.s5} ${({ theme }) => theme.spacing.s5}
    ${({ theme }) => theme.spacing.s2} ${({ theme }) => theme.spacing.s5};
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray800" : "white"]};
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const ScrollableContent = styled.div`
  ${flexColumn};
  ${scrollbar};
  overflow-y: auto;
  padding-bottom: ${({ theme }) => theme.spacing.s5};
`;

export const List = styled.ul`
  ${flexColumn};
  list-style-type: none;
  padding: 0 ${({ theme }) => theme.spacing.s2};
`;

export const ListItem = styled.li`
  ${flexColumn};
  position: relative;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s2};
  }
`;

export const Footer = styled.div`
  ${flexColumn};
  padding: ${({ theme }) => theme.spacing.s2};
`;

export const StyledLink = styled.a`
  ${flexColumn};
  text-decoration: none;
`;
