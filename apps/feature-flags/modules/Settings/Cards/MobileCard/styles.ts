import styled from "styled-components";
import { Text } from "@basestack/design-system";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray900" : "gray50"]};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.s4};

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s4};
  }
`;

export const Title = styled(Text)`
  text-transform: capitalize;
  margin-bottom: ${({ theme }) => theme.spacing.s1};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s1} 0;
`;
