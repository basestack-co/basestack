import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const Box = styled.div.withConfig({
  shouldForwardProp: (prop) => !["mb", "p"].includes(prop),
})<SpaceProps>`
  display: flex;
  flex-direction: column;
  ${space};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;
