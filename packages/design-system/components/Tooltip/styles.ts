import styled from "styled-components";

export const StyledContent = styled.div`
  background-color: ${({ theme }) => theme.tooltip.backgroundColor};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  color: ${({ theme }) => theme.tooltip.color};
  padding: 4px 8px;
  border-radius: 4px;
  box-sizing: border-box;
  width: max-content;
  max-width: calc(100vw - 10px);
  font-family: ${({ theme }) => theme.typography.roboto};
  font-size: 14px;
  z-index: 1000;
`;

export const StyledTrigger = styled.div`
  background-color: transparent;
  border: none;
  cursor: default;
`;
