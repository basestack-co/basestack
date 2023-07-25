import styled from "styled-components";
import { rem } from "polished";
import { Card } from "@basestack/design-system";

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  align-items: start;
  grid-gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: 1fr;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.spacing.s5};
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue300" : "primary"]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
