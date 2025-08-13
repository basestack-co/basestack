import { rem } from "polished";
import styled, { css } from "styled-components";
import {
  compose,
  type FlexboxProps,
  flexbox,
  type LayoutProps,
  layout,
  type SpaceProps,
  space,
} from "styled-system";

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

interface ListItemProps extends FlexboxProps, LayoutProps, SpaceProps {}

export const ListItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "alignItems",
})<ListItemProps>`
  ${compose(space, flexbox, layout)};
`;

export const LogoContainer = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "showSeparator",
})<{ showSeparator: boolean }>`
  ${flexCenter};
  position: relative;
  padding-right: ${({ theme }) => theme.spacing.s4};
  margin-right: ${({ theme }) => theme.spacing.s1};
  cursor: pointer;
  border: none;
  background-color: transparent;

  ${({ showSeparator, theme }) =>
    showSeparator &&
    css`
      &::before {
        content: "";
        position: absolute;
        height: 20px;
        right: -1px;
        width: 2px;
        background-color: ${theme.colors[
          theme.isDarkMode ? "gray600" : "gray100"
        ]};
      }
    `}
`;
