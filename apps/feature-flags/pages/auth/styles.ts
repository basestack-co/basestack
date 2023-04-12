import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${rem("400px")} 1fr;
  min-height: 100vh;
`;

export const LeftContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.s8};
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")};
  max-width: ${rem("800px")};
`;

export const CardsList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.s8};
`;

export const CardsItem = styled.li`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s5};
  }
`;
