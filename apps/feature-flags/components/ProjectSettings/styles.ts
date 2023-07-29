import styled, { css } from "styled-components";

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const CardList = styled.ul`
  ${flexColumn};
  overflow: hidden;
`;

export const CardListItem = styled.li`
  ${flexColumn};
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s5};
  }
`;
