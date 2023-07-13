import styled, { createGlobalStyle, css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { scrollbar } from "@basestack/design-system/styles";
import { rem, transparentize } from "polished";

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
  background-color: ${({ theme }) => theme.colors.white};
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
  padding: 0 ${({ theme }) => theme.spacing.s5};
  margin-bottom: ${({ theme }) => theme.spacing.s2};
`;

export const List = styled.ul<{ enableScroll?: boolean }>`
  ${flexColumn};
  list-style-type: none;
  padding: 0 ${({ theme }) => theme.spacing.s2};

  ${({ enableScroll, theme }) =>
    enableScroll &&
    css`
      ${scrollbar};
      overflow-y: auto;
      padding-bottom: ${theme.spacing.s5};
    `}
`;

export const ListItem = styled.li`
  ${flexColumn};
  position: relative;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s2};
  }
`;

export const Divider = styled.hr<SpaceProps>`
  ${space};
  ${flexColumn};
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

export const Footer = styled.div`
  ${flexColumn};
  padding: ${({ theme }) => theme.spacing.s2};
`;
