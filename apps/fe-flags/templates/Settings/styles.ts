import styled, { css } from "styled-components";
import { Button } from "design-system";

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
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
    width: 3px;
    height: 44px;
    background-color: ${({ theme }) => theme.colors.black};
    transition: transform 0.2s ease-in-out;
    transform: translateY(${({ top }) => `${top}%`});
  }
`;

export const ListItem = styled.li`
  display: flex;
`;

export const StyledButton = styled(Button)<{
  isActive: boolean;
}>`
  height: 44px;
  border-radius: 0;
  padding-left: 20px;

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.colors.gray100};
    `};
`;

export const CardList = styled.ul`
  ${flexColumn};
`;

export const CardListItem = styled.ul`
  ${flexColumn};
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s5};
  }
`;
