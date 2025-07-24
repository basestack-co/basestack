import { rem } from "polished";
import styled, { css } from "styled-components";

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isButton",
})<{ isButton: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border: none;

  ${({ isButton }) =>
    isButton &&
    css`
      cursor: pointer;

      & > div {
        transition: background-color 0.2s linear;

        .amount-container {
          transition: transform 0.2s linear;
          transform: translateX(${rem("44px")});
        }

        .arrow-icon {
          opacity: 0;
          transform: translateX(${rem("20px")});
          transition:
            transform 0.2s linear,
            opacity 0.2s linear;
        }
      }

      &:hover:not(:disabled) > div {
        outline-offset: -1px;
        background-color: ${({ theme }) =>
          theme.colors[theme.isDarkMode ? "gray700" : "blue50"]};
        outline: 1px solid
          ${({ theme }) =>
            theme.colors[theme.isDarkMode ? "gray600" : "primary"]};

        .arrow-icon {
          opacity: 1;
          transform: translateX(0);
        }

        .amount-container {
          transform: translateX(0);
        }
      }
    `};

  &:disabled {
    cursor: initial;
    opacity: 0.6;
  }
`;

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
  align-items: flex-start;
  flex-grow: 1;
`;

export const AmountContainer = styled.div`
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

export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s5};
  row-gap: ${({ theme }) => theme.spacing.s1};
  flex-wrap: wrap;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-child) {
    &::before {
      content: "";
      position: absolute;
      right: ${rem("-11px")};
      width: 2px;
      height: ${rem("16px")};
      background-color: ${({ theme }) =>
        theme.colors[theme.isDarkMode ? "gray700" : "gray100"]};
    }
  }
`;
