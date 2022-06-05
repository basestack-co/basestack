import styled, { css } from "styled-components";
import { Button } from "design-system";
import { rem } from "polished";

const flexColumn = css`
  display: flex;
  flex-direction: column;
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

export const StyledButton = styled(Button)<{
  isActive: boolean;
}>`
  height: ${rem("44px")};
  border-radius: 0;
  padding-left: ${({ theme }) => theme.spacing.s5};

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
