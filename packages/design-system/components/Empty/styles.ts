import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { rem } from "polished";

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
