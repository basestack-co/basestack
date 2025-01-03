import styled from "styled-components";
import { space } from "styled-system";

export const Hr = styled.hr.withConfig({
  shouldForwardProp: (prop) => prop !== "isDarker",
})<{ isDarker: boolean }>`
  ${space};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 1px;
  border: none;
  background-color: ${({ theme, isDarker }) =>
    isDarker
      ? theme.horizontalRule.darker.backgroundColor
      : theme.horizontalRule.backgroundColor};
`;
