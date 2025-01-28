import styled, { css } from "styled-components";
import { rem } from "polished";

const backgroundBlur = css`
  background: ${({ theme }) =>
    theme.isDarkMode ? "rgba(20, 20, 20, 0.7)" : "rgba(246, 246, 246, 0.7)"};
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
`;

export const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-shrink: 0;
  height: ${rem("64px")};
  padding: 0 ${({ theme }) => theme.spacing.s5};
  ${backgroundBlur};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.isDarkMode
        ? theme.horizontalRule.backgroundColor
        : theme.horizontalRule.darker.backgroundColor};
`;

export const ContentContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: ${rem("1440px")};
`;

export const LeftColumn = styled.div`
  display: flex;
`;

export const List = styled.ul`
  display: flex;
`;

export const ListItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !["isActive"].includes(prop),
})<{
  isActive: boolean;
}>`
  display: flex;
  align-items: center;
  position: relative;

  ${({ isActive }) =>
    isActive &&
    css`
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: black;
        z-index: 1;
      }
    `}
`;

export const RightColumn = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
