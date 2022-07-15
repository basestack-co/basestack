import styled, { css } from "styled-components";

const flexColumn = css`
  display: flex;
  flex-direction: column;
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
