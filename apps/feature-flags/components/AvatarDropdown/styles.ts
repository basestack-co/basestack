import styled, { css } from "styled-components";
import { position, space, SpaceProps } from "styled-system";
import { rem } from "polished";

export const List = styled.ul<SpaceProps>`
  ${space};
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div<SpaceProps>`
  ${space};
`;

export const ListItem = styled.li<SpaceProps>`
  ${space};
`;

export const AvatarButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 18px;
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme }) =>
      theme.button.primaryNeutral.hover.backgroundColor};

    span {
      color: ${({ theme }) => theme.button.primaryNeutral.hover.color};
    }
  }
`;

export const AvatarDetailedButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  border: none;
  background-color: transparent;
  padding: ${({ theme }) => theme.spacing.s3};
  border-radius: 4px;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray700" : "gray100"]};
  }

  &:active {
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray600" : "gray200"]};
  }
`;

export const Dropdown = styled.div`
  ${position};
  background-color: ${({ theme }) => theme.popup.backgroundColor};
  box-shadow: ${({ theme }) => theme.shadow.elevation6};
  padding: ${({ theme }) => theme.spacing.s1};
  border-radius: 4px;
  width: ${rem("280px")};
  z-index: ${({ theme }) => theme.zIndex.popup};
  padding: ${({ theme }) => theme.spacing.s4} ${({ theme }) => theme.spacing.s1};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.spacing.s3};
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ThemeContainer = styled.div<{ showFullButton?: boolean }>`
  display: flex;
  align-items: center;
  height: ${rem("32px")};
  margin: ${({ theme }) => theme.spacing.s3} 0;

  ${({ showFullButton, theme }) =>
    showFullButton &&
    css`
      margin-top: ${theme.spacing.s1};
    `}
`;

export const HrContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.s3};
  margin: ${({ theme }) => theme.spacing.s3} 0;
`;
