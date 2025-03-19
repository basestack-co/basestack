import styled from "styled-components";
import { rem } from "polished";
import { Card } from "../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${({ theme }) => theme.spacing.s3};
`;

export const Header = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s5};
  align-items: center;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
`;

export const Indicator = styled.div.withConfig({
  shouldForwardProp: (prop) => !["color"].includes(prop),
})<{ color: "blue" | "green" | "yellow" }>`
  display: inline-flex;
  width: ${rem("10px")};
  border-radius: ${rem("5px")};
  height: ${rem("60px")};
  flex-shrink: 0;
  background-color: ${({ color }) => color};
`;

export const StyledCard = styled(Card)`
  flex-grow: 1;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: ${({ theme }) => theme.spacing.s3};
  padding-top: ${rem("100px")};
`;

export const ListItem = styled.li`
  display: inline-flex;
`;

export const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  border-radius: ${rem("8px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  padding: ${({ theme }) => theme.spacing.s5};
  transition: box-shadow 0.2s ease-in-out;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadow.elevation4};
  }
`;
