import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToolBar = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.s6};
  gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.s2};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;
