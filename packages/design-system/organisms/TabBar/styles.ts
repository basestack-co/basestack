import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.tabBar};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow:
    rgb(0 0 0 / 10%) 0 0 3px 0,
    rgb(0 0 0 / 6%) 0 0 2px 0;
  height: ${rem("64px")};
  margin-top: auto;
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const ListItem = styled.li`
  padding: 0 ${({ theme }) => theme.spacing.s2};

  @media screen and (min-width: 380px) {
    padding: 0 ${({ theme }) => theme.spacing.s3};
  }

  @media screen and ${({ theme }) => theme.device.min.sm} {
    padding: 0 ${({ theme }) => theme.spacing.s4};
  }
`;

export const StyledButton = styled.a<{ isActive: boolean }>`
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${rem("14px")};
  font-weight: 500;
  height: ${rem("64px")};
  padding: 0 ${({ theme }) => theme.spacing.s3};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.black};
  border-top: ${({ theme, isActive }) =>
    `3px solid ${isActive ? theme.colors.primary : theme.colors.white}`};
`;
