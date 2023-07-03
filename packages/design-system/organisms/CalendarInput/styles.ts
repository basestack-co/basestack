import styled from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Container = styled.div<SpaceProps>`
  ${space};
  display: flex;
  flex-direction: column;
`;
