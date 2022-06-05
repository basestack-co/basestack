import styled, { css } from "styled-components";
import { rem } from "polished";

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 1440px;
  margin: 0 auto;
`;

export const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: ${rem("220px")} 1fr;
  grid-gap: ${({ theme }) => theme.spacing.s5};
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
    background-color: ${({ theme }) => theme.colors.black};
    transition: transform 0.2s ease-in-out;
    transform: translateY(${({ top }) => `${top}%`});
  }
`;

export const ListItem = styled.li`
  display: flex;
`;

export const ButtonContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-grow: 1;
  a {
    height: ${rem("44px")};
    border-radius: 0;
    padding-left: ${({ theme }) => theme.spacing.s5};

    ${({ isActive, theme }) =>
      isActive &&
      css`
        background-color: ${theme.colors.gray100};
      `};
  }
`;
