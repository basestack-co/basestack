import styled from "styled-components";
import { rem } from "polished";

export const IconContainer = styled.div<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  height: ${rem("48px")};
  width: ${rem("48px")};
  border-radius: ${rem("8px")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
`;
