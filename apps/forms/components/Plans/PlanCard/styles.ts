import styled from "styled-components";
import { rem } from "polished";

export const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s5};
`;

export const TitleContainer = styled.div`
  text-transform: capitalize;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s1};
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s5};
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-child) {
    &::before {
      content: "";
      position: absolute;
      right: ${rem("-10px")};
      width: 2px;
      height: ${rem("16px")};
      background-color: ${({ theme }) =>
        theme.colors[theme.isDarkMode ? "gray700" : "gray100"]};
    }
  }
`;
