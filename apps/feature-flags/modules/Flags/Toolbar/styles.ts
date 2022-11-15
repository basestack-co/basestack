import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

export const Container = styled.header<SpaceProps>`
  ${space};
  display: flex;
  align-items: center;
`;

export const PillsUl = styled.ul`
  display: flex;
  margin: 0 auto 0 ${({ theme }) => theme.spacing.s5};
`;

export const PillLi = styled.li`
  display: flex;
  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing.s1};
  }
`;
