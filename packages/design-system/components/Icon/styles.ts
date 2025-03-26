import styled from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["size"].includes(prop),
})<{ size?: number }>`
  height: ${({ size }) => rem(`${size}px`)};
  width: ${({ size }) => rem(`${size}px`)};
  flex-shrink: 0;
  ${space};
`;

export const Icon = styled.span.withConfig({
  shouldForwardProp: (prop) => !["size", "muted", "color"].includes(prop),
})<{ size?: number; muted?: boolean; color?: string }>`
  color: ${({ theme, color, muted }) =>
    color || (muted ? theme.icon.muted : theme.icon.color)};
  font-size: ${({ size }) => rem(`${size}px`)};
`;
