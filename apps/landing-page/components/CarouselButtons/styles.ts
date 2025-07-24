import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["hasMarginTop"].includes(prop),
})<{
  hasMarginTop: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.s5};
  padding: 0 ${({ theme }) => theme.spacing.s5};
  margin-top: ${({ theme, hasMarginTop }) =>
    hasMarginTop ? theme.spacing.s3 : 0};
`;

export const Placeholder = styled.div`
  width: ${rem("80px")};
  flex-shrink: 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s2};
  flex-shrink: 0;
`;

export const Progress = styled.div`
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray600" : "gray200"]};
  position: relative;
  height: 2px;
  width: 100%;
  max-width: ${rem("100px")};
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray300" : "black"]};
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: -100%;
`;
