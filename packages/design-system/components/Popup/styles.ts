import styled from "styled-components";
import { rem } from "polished";
import { position } from "styled-system";

export const Container = styled.div`
  ${position};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.elevation6};
  padding: ${({ theme }) => theme.spacing.s1};
  border-radius: 4px;
  width: ${rem("150px")};
  z-index: ${({ theme }) => theme.zIndex.popup};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;
