import { rem } from "polished";
import styled from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["p"].includes(prop),
})<SpaceProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.empty.backgroundColor};
  border-radius: ${rem("6px")};
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5};
  border-radius: ${rem("6px")};
  justify-content: center;
  align-items: center;
  ${space};
`;
