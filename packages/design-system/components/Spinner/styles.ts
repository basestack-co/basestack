import { rem } from "polished";
import styled, { keyframes } from "styled-components";
import { space } from "styled-system";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const StyledSpinner = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "strokeSize",
})<{
  size: string;
  strokeSize: string;
  color?: string;
  bg?: string;
}>`
  ${space};
  display: inline-flex;
  width: ${({ size }) => rem(size)};
  height: ${({ size }) => rem(size)};
  border-radius: 50%;

  border-top: ${({ strokeSize }) => rem(strokeSize)} solid
    ${({ theme, bg }) => bg || theme.spinner.backgroundColor};
  border-right: ${({ strokeSize }) => rem(strokeSize)} solid
    ${({ theme, bg }) => bg || theme.spinner.backgroundColor};
  border-bottom: ${({ strokeSize }) => rem(strokeSize)} solid
    ${({ theme, bg }) => bg || theme.spinner.backgroundColor};

  border-left: ${({ strokeSize }) => rem(strokeSize)} solid
    ${({ theme, color }) => color || theme.spinner.color};
  animation: ${rotate} 1.1s infinite linear;
`;
