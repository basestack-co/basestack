import styled, { css } from "styled-components";
import { space, position, layout, compose } from "styled-system";
import { rem } from "polished";

export const Container = styled.div<{ hasHoverAnimation: boolean }>`
  ${compose(space, position, layout)};
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  background-color: ${({ theme }) => theme.card.backgroundColor};
  border-radius: ${rem("6px")};

  ${({ hasHoverAnimation }) =>
    hasHoverAnimation &&
    css`
      transition: box-shadow 0.2s ease-in-out;
      &:hover {
        box-shadow: ${({ theme }) => theme.shadow.elevation4};
      }
    `};
`;
