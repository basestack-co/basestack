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

export const SettingCardContainer = styled.div`
  @media screen and ${({ theme }) => theme.device.max.lg} {
    max-width: calc(100vw - ${rem("40px")});
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.s5};
  gap: ${({ theme }) => theme.spacing.s2};
`;
