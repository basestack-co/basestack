import { rem } from "polished";
import styled, { css } from "styled-components";
import { space } from "styled-system";
import type { Gradient, IconBoxVariant, Size } from "./types";

const getSize = {
  small: "34px",
  medium: "40px",
  large: "48px",
};

export const IconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["outlinedBg", "filledBg"].includes(prop),
})<{
  filledBg: string;
  outlinedBg?: string;
  variant: IconBoxVariant;
  gradient?: Gradient;
  size?: Size;
}>`
  ${space};
  position: relative;
  height: ${({ size }) => rem(getSize[size || "large"])};
  width: ${({ size }) => rem(getSize[size || "large"])};
  border-radius: ${rem("8px")};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ variant, filledBg }) =>
    variant === "filled" &&
    css`
      background-color: ${filledBg};
    `}

  ${({ variant, outlinedBg, gradient }) =>
    variant === "outlined" &&
    css`
      background: ${({ theme: { iconBox } }) =>
        `linear-gradient(220deg, 
        ${gradient?.[0] || iconBox.outlined.gradient[0]} 0%, 
        ${gradient?.[1] || iconBox.outlined.gradient[1]} 30%, 
        ${gradient?.[2] || iconBox.outlined.gradient[2]} 70%, 
        ${gradient?.[3] || iconBox.outlined.gradient[3]} 100%)`};

      &::before {
        content: "";
        position: absolute;
        inset: 1px;
        background: ${({ theme }) =>
          outlinedBg || theme.iconBox.outlined.backgroundColor};
        border-radius: ${rem("7px")};
        z-index: 0;
      }
    `}
`;

export const ContentContainer = styled.div`
  position: relative;
  display: inline-flex;
  z-index: 1;
`;
