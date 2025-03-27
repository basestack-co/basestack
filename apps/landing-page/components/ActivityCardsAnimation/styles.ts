import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s2};
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;
