import styled from "styled-components";
import { rem } from "polished";
import { position } from "styled-system";
import { scrollbar } from "../../styles";

export const Container = styled.div`
  ${position};
  background-color: ${({ theme }) => theme.popupActions.backgroundColor};
  box-shadow: ${({ theme }) => theme.shadow.elevation6};
  padding: ${({ theme }) => theme.spacing.s1};
  border-radius: 4px;
  width: ${rem("220px")};
  z-index: ${({ theme }) => theme.zIndex.popup};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 264px;
  overflow-y: auto;
  ${scrollbar};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  background-color: ${({ theme }) => theme.popupActions.backgroundColor};
  top: 0;
  padding: ${({ theme }) => theme.spacing.s1} ${({ theme }) => theme.spacing.s2}
    0 ${({ theme }) => theme.spacing.s2};
  will-change: transform;
  transform: translateZ(0);
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;

export const PopUpButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.popupActions.button.backgroundColor};
  border: none;
  padding: ${rem("8px")};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) =>
      theme.popupActions.button.hover.backgroundColor};
  }
  &:active {
    background-color: ${({ theme }) =>
      theme.popupActions.button.active.backgroundColor};
  }
`;
