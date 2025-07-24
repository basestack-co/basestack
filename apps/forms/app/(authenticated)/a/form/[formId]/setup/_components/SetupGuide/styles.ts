import { rem } from "polished";
import styled from "styled-components";

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.default};
  margin-top: ${({ theme }) => theme.spacing.s5};
  border-radius: 4px;
`;

export const StepWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
  }
`;

export const IconContainer = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  margin: 1px ${({ theme }) => theme.spacing.s4} 0 0;

  @media screen and ${({ theme }) => theme.device.max.sm} {
    margin: 0 0 ${({ theme }) => theme.spacing.s3} 0;
  }
`;

export const TextHighlight = styled.span`
  padding: ${rem("4px")} ${rem("6px")};
  border-radius: 2px;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray300" : "gray700"]};
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray600" : "gray200"]};
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.s3};
`;

export const ListItem = styled.li`
  display: inline-flex;
`;

export const CodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) =>
    `0 ${theme.spacing.s5} ${theme.spacing.s5} ${rem("60px")}`};
  border-radius: 4px;
  overflow: hidden;

  @media screen and ${({ theme }) => theme.device.max.sm} {
    padding-left: ${({ theme }) => theme.spacing.s5};
  }
`;
