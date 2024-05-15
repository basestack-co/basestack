import styled from "styled-components";
import { space } from "styled-system";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${space};
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s4};
  gap: ${({ theme }) => theme.spacing.s3};
`;

export const StyledLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue300" : "primary"]};
  cursor: pointer;
  margin-left: auto;

  &:hover {
    text-decoration: underline;
  }
`;
