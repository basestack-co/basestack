import styled from "styled-components";
import { rem } from "polished";

export const CardButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.s3};
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray800" : "white"]};
  border-radius: ${rem("6px")};
  border: 1px solid
    ${({ isSelected, theme }) =>
      isSelected
        ? theme.colors[theme.isDarkMode ? "blue300" : "primary"]
        : theme.colors[theme.isDarkMode ? "gray800" : "white"]};
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.elevation3};
  }
`;
