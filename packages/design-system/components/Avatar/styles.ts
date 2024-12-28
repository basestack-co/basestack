import styled, { css } from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "round",
})<{ size: number; round: boolean }>`
  height: ${({ size }) => rem(`${size}px`)};
  width: ${({ size }) => rem(`${size}px`)};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  ${space};

  ${({ round }) =>
    round
      ? css`
          border-radius: 50%;
        `
      : css`
          border-radius: 4px;
        `}
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
