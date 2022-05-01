import styled from "styled-components";
import { rem } from "polished";

export const StyledLabel = styled.div<{ variant: "success" | "default" }>`
  display: flex;
  padding: ${rem("4px")} ${rem("6px")};
  border-radius: 4px;
  font-size: ${rem("14px")};
  line-height: ${rem("16px")};
  font-weight: 400;
  color: ${({ theme, variant }) =>
    variant === "success" ? theme.colors.white : theme.colors.gray600};
  background-color: ${({ theme, variant }) =>
    variant === "success" ? theme.colors.green400 : theme.colors.gray200};
`;
