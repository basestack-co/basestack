import styled from "styled-components";
import { rem } from "polished";
import { Card } from "design-system";

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 1200px;
  margin: 0 auto;
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-gap: ${({ theme }) => theme.spacing.s5};
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.spacing.s5};
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledCard = styled(Card)`
  align-self: self-start;
`;

export const IconContainer = styled.div<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  height: ${rem("48px")};
  width: ${rem("48px")};
  border-radius: ${rem("8px")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
`;
