import styled from "styled-components";
import { rem } from "polished";
import { position } from "styled-system";
import { scrollbar } from "../../styles";

export const Container = styled.div`
  ${position};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.elevation6};
  padding: ${({ theme }) => theme.spacing.s1};
  border-radius: 4px;
  width: ${rem("220px")};
  z-index: ${({ theme }) => theme.zIndex.popup};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.s2};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 264px;
  overflow-y: scroll;
  ${scrollbar};
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;

export const PopUpButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: ${rem("8px")};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;
