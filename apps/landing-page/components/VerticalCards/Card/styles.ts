import styled, { css } from "styled-components";
import { rem } from "polished";
import { gradientBorderStyles } from "../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${({ theme }) => theme.spacing.s3};
`;

export const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  border-radius: ${rem("8px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  transition: box-shadow 0.2s ease-in-out;

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadow.elevation4};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${rem("24px")} ${theme.spacing.s5}`};
  flex-grow: 1;
  justify-content: space-between;
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

export const HeaderContainer = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  position: relative;
  ${gradientBorderStyles("bottom")};

  &::before {
    transition: all 0.1s ease-in-out;
    content: "";
    position: absolute;
    bottom: 0;
    height: 1px;
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray700" : "gray200"]};
    left: ${({ theme }) => theme.spacing.s5};
    right: ${({ theme }) => theme.spacing.s5};

    ${({ theme }) =>
      theme.isDarkMode
        ? css`
            background-image: linear-gradient(
              to right,
              ${theme.colors.gray700} 0%,
              ${theme.colors.gray600} 25%,
              ${theme.colors.gray600} 50%,
              ${theme.colors.gray600} 75%,
              ${theme.colors.gray700} 100%
            );
          `
        : css`
            background-image: linear-gradient(
              to right,
              ${theme.colors.gray50} 0%,
              ${theme.colors.gray200} 25%,
              ${theme.colors.gray200} 50%,
              ${theme.colors.gray200} 75%,
              ${theme.colors.gray50} 100%
            );
          `};
  }
`;

export const IconContainer = styled.div`
  display: inline-flex;
`;
