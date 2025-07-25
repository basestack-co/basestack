import { neutralButtonStyles } from "@basestack/design-system";
import Link from "next/link";
import { rem } from "polished";
import styled, { css } from "styled-components";

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

export const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.min.lg} {
    grid-template-columns: ${rem("220px")} 1fr;
  }
`;

export const List = styled.ul<{ top: number }>`
  ${flexColumn};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: ${rem("44px")};
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray300" : "black"]};
    transition: transform 0.2s ease-in-out;
    transform: translateY(${({ top }) => `${top}%`});
    z-index: 10;
  }
`;

export const ListItem = styled.li`
  display: flex;
`;

export const StyledLink: any = styled(Link)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-decoration: none;
`;

interface StyledButtonProps {
  isActive: boolean;
}

export const StyledButton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<StyledButtonProps>`
  ${neutralButtonStyles};
  height: ${rem("44px")};
  font-size: ${rem("14px")};
  border-radius: 0;
  padding-left: ${({ theme }) => theme.spacing.s5};

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${
        theme.colors[theme.isDarkMode ? "gray800" : "gray100"]
      };
    `};
`;

export const CardList = styled.ul`
  ${flexColumn};
`;

export const CardListItem = styled.li`
  ${flexColumn};

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s5};
  }
`;

export const ProfileCardContainer = styled.div`
  @media screen and ${({ theme }) => theme.device.max.lg} {
    max-width: calc(100vw - ${rem("40px")});
  }
`;
