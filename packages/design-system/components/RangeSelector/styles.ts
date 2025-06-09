import styled from "styled-components";
import { rem } from "polished";

interface StyledRangeProps {
  percentage: number;
  fillColor: string;
  trackColor: string;
}

export const StyledRange = styled.input.attrs({
  type: "range",
})<StyledRangeProps>`
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
    width: ${rem("24px")};
    height: ${rem("24px")};
    border-radius: 50%;
    background: ${({ fillColor }) => fillColor};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.elevation3};
  }

  &::-moz-range-thumb {
    width: ${rem("24px")};
    height: ${rem("24px")};
    border: none;
    border-radius: 50%;
    background: ${({ fillColor }) => fillColor};
    cursor: pointer;
  }
`;
