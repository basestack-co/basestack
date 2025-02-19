import styled from "styled-components";
import { rem } from "polished";

export const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => !["p"].includes(prop),
})<{ p?: string | number }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  border-radius: ${rem("8px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  border: 1px solid
    ${({ theme }) =>
      theme.isDarkMode ? theme.colors.gray700 : theme.colors.gray200};
  padding: ${({ p, theme }) =>
    p !== undefined && p !== null
      ? typeof p === "number"
        ? `${p}px`
        : p
      : theme.spacing.s5};
`;
