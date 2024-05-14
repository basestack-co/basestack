import styled, { css } from "styled-components";
import { rem } from "polished";

const flexColumn = css`
  display: flex;
  flex-direction: column;
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

export const ProfileCardContainer = styled.li`
  @media screen and ${({ theme }) => theme.device.max.lg} {
    max-width: calc(100vw - ${rem("40px")});
  }
`;
