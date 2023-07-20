import styled, { css } from "styled-components";
import { Card } from "@basestack/design-system";

export const StyledCard = styled(Card)<{ variant: "default" | "danger" }>`
  ${({ variant }) =>
    variant === "danger" &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.red400};
    `};
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s4} ${({ theme }) => theme.spacing.s5};
`;
