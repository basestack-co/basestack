import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 1440px;
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
    margin-bottom: ${({ theme }) => theme.spacing.s3};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.s5};
`;
