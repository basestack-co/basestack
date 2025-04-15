import styled from "styled-components";

export const CircleWrapper = styled.div<{ size: number }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const Svg = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

export const CircleProgress = styled.circle`
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
`;

export const Percentage = styled.div`
  position: absolute;
`;
