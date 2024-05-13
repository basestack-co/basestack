import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s3};
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;
