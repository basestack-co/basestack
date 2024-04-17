import styled from "styled-components";
import { rem } from "polished";

export const StepContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background.default};
  margin-top: ${({ theme }) => theme.spacing.s5};
  padding: ${({ theme }) => theme.spacing.s5};
  border-radius: 4px;
`;

export const TextHighlight = styled.span`
  padding: ${rem("4px")} ${rem("6px")};
  border-radius: 2px;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray300" : "gray700"]};
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray600" : "gray200"]};
`;
