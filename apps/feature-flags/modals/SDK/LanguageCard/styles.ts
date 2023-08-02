import styled from "styled-components";

export const CardButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  background-color: transparent;
  border: none;

  & > div {
    border: 1px solid
      ${({ isSelected, theme }) =>
        isSelected
          ? theme.colors[theme.isDarkMode ? "blue300" : "primary"]
          : theme.colors[theme.isDarkMode ? "gray800" : "white"]};
  }
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CopyButtonContainer = styled.div`
  display: inline-flex;
  position: absolute;
  right: ${({ theme }) => theme.spacing.s3};
  top: ${({ theme }) => theme.spacing.s3};
`;
