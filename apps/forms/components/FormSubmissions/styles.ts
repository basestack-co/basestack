import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing.s5} 0;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 260px;
  margin-right: ${({ theme }) => theme.spacing.s5};
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s3};
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
