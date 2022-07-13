import styled, { css } from "styled-components";
import { space, position, compose } from "styled-system";
import { Card } from "../../atoms";
import { rem } from "polished";

export const StyledCard = styled(Card)`
  ${compose(space, position)};
  padding: ${rem("10px")};
`;

export const CardWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr 2fr 1fr auto;
  grid-gap: ${({ theme }) => theme.spacing.s5};
`;

export const Labels = styled.div`
  display: flex;
`;

export const Label = styled.div<{
  isActive: boolean;
  index: number;
  length: number;
}>`
  height: ${rem("14px")};
  width: ${rem("14px")};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  flex-shrink: 0;
  z-index: ${({ length, index }) => length - index};

  &:not(:first-child) {
    transform: ${({ index }) => `translateX(-${index * 4}px)`};
  }

  &:hover {
    z-index: ${({ length }) => length + 1};
  }

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: ${({ theme }) => theme.colors.green400};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.gray300};
        `};
`;

export const PopupWrapper = styled.div`
  height: ${rem("32px")};
  width: ${rem("32px")};
`;
