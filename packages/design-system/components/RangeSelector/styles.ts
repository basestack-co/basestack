import styled from "styled-components";
import { rem } from "polished";

interface StyledRangeProps {
  percentage: number;
  fillColor: string;
  trackColor: string;
  inputSize: number;
}

const shouldForwardProp = (prop: string) =>
  !["percentage", "fillColor", "trackColor", "inputSize"].includes(prop);

export const StyledRange = styled.input
  .attrs({ type: "range" })
  .withConfig({ shouldForwardProp })<StyledRangeProps>`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${({ percentage, fillColor, trackColor }) =>
    `linear-gradient(to right, ${fillColor} ${percentage}%, ${trackColor} ${percentage}%)`};
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${({ inputSize }) => rem(`${inputSize}px`)};
    height: ${({ inputSize }) => rem(`${inputSize}px`)};
    border-radius: 50%;
    background: ${({ fillColor }) => fillColor};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.elevation3};
  }

  &::-moz-range-thumb {
    width: ${({ inputSize }) => rem(`${inputSize}px`)};
    height: ${({ inputSize }) => rem(`${inputSize}px`)};
    border: none;
    border-radius: 50%;
    background: ${({ fillColor }) => fillColor};
    cursor: pointer;
  }
`;
