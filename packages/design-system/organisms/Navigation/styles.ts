import styled, { css } from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";

export const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.navigation};
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  height: ${rem("64px")};
  padding: 0 ${({ theme }) => theme.spacing.s4};
`;

const flexCenter = css`
  display: flex;
  align-items: center;
`;

export const ButtonContainer = styled.div<{ isActive: boolean }>`
  ${flexCenter};
  position: relative;
  height: ${rem("64px")};
  ${({ isActive }) =>
    isActive &&
    css`
      a {
        color: ${({ theme }) => theme.colors.blue400};
      }

      &::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: ${({ theme }) => theme.colors.blue400};
      }
    `};
`;

export const List = styled.ul`
  ${space};
  ${flexCenter};
`;

export const ListItem = styled.li`
  ${space};
`;

export const LogoContainer = styled.div`
  ${flexCenter};
  position: relative;
  padding-right: ${({ theme }) => theme.spacing.s4};
  margin-right: ${({ theme }) => theme.spacing.s1};

  &::before {
    content: "";
    position: absolute;
    height: 20px;
    right: -1px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;
