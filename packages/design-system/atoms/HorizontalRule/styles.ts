import styled from "styled-components";
import { space } from "styled-system";

export const Hr = styled.hr`
  ${space};
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray100};
  width: 100%;
`;
