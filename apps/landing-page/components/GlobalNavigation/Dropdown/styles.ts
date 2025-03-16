import styled from "styled-components";
import { position, space, SpaceProps, PositionProps } from "styled-system";
import { neutralButtonStyles } from "@basestack/design-system";
import { rem } from "polished";

export const Container = styled.div<SpaceProps>`
  display: flex;
  ${space};
`;

export const Dropdown = styled.div<PositionProps>`
  ${position};
  background-color: ${({ theme }) => theme.popup.backgroundColor};
  box-shadow: ${({ theme }) => theme.shadow.elevation6};
  border-radius: 4px;
  width: ${rem("280px")};
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

export const StyledButton = styled.button`
  ${neutralButtonStyles};
  padding: ${({ theme }) => theme.spacing.s2};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: ${({ theme }) => theme.spacing.s3};
  flex-grow: 1;
`;
