import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 992px;
  margin: 0 auto;
  width: 100%;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s5};
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;