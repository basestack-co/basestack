import styled from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";

export const Container = styled.div<{ size: number }>`
  height: ${({ size }) => rem(`${size}px`)};
  width: ${({ size }) => rem(`${size}px`)};
  flex-shrink: 0;
  ${space};
`;

export const Icon = styled.span<{
  size?: number;
  muted?: boolean;
  color?: string;
}>`
  color: ${({ theme, color, muted }) =>
    color || (muted ? theme.icon.muted : theme.icon.color)};
  font-size: ${({ size }) => rem(`${size}px`)};
`;
