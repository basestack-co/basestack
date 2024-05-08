import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { rem } from "polished";

export const Container = styled.nav`
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

const flexCenter = css`
  display: flex;
  align-items: center;
`;

export const List = styled.ul<SpaceProps>`
  ${space};
  ${flexCenter};
`;

export const ListItem = styled.li<SpaceProps>`
  ${space};
`;

export const LogoContainer = styled.button`
  ${flexCenter};
  position: relative;
  padding-right: ${({ theme }) => theme.spacing.s4};
  margin-right: ${({ theme }) => theme.spacing.s1};
  cursor: pointer;
  border: none;
  background-color: transparent;

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
