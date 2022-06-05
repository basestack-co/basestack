import styled from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";

export const Container = styled.div`
  ${space};
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: ${({ theme }) => theme.spacing.s5};
  border-radius: 4px;
`;

export const StyledRow = styled.div<{ numberOfColumns: number }>`
  display: grid;
  grid-template-columns:
    repeat(${({ numberOfColumns }) => numberOfColumns || 3}, 1fr)
    auto;
  grid-gap: ${({ theme }) => theme.spacing.s5};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  }
`;

export const Placeholder = styled.div`
  min-width: ${rem("36px")};
  pointer-events: none;
`;

export const Col = styled.div`
  height: ${rem("45px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
`;
