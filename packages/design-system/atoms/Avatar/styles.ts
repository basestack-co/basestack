import styled from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";

export const Container = styled.div<{ size: number }>`
  height: ${({ size }) => rem(`${size}px`)};
  width: ${({ size }) => rem(`${size}px`)};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  ${space};
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
