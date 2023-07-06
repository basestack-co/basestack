import styled from "styled-components";

export const StyledContent = styled.div`
  background-color: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.white};
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