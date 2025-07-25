import { rem } from "polished";
import styled from "styled-components";
import { type PositionProps, position } from "styled-system";

export const Container = styled.div`
  display: none;
  margin-left: ${({ theme }) => theme.spacing.s1};

  @media screen and ${({ theme }) => theme.device.max.md} {
    display: flex;
  }
`;

export const Dropdown = styled.div<PositionProps>`
  ${position};
  background-color: ${({ theme }) => theme.popup.backgroundColor};
  box-shadow: ${({ theme }) => theme.shadow.elevation6};
  border-radius: 4px;
  width: ${rem("220px")};
  z-index: ${({ theme }) => theme.zIndex.popup};
  padding: ${({ theme }) => theme.spacing.s1};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;
