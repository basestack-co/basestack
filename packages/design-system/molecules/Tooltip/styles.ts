import styled from "styled-components";

export const StyledContent = styled.div`
  background-color: #444;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  box-sizing: border-box;
  width: max-content;
  max-width: calc(100vw - 10px);
  z-index: 1000;
  font-family: ${({ theme }) => theme.typography.roboto};
  font-size: 14px;
`;

export const StyledTrigger = styled.div`
  background-color: transparent;
  border: none;
  cursor: default;
`;
