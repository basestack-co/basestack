import styled from "styled-components";
import { space } from "styled-system";

export const Hr = styled.hr`
  ${space};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.horizontalRule.backgroundColor};
`;
