import styled from "styled-components";
import { space } from "styled-system";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<{
  backgroundColor?: string;
}>`
  ${space};
  display: flex;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.segment.backgroundColor};
  border-radius: 4px;
  height: 36px;
  padding: 4px;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  z-index: 1;
  border-radius: 4px;
  transition: background-color 0.1s ease-in-out;

  &:hover:not(.active) {
    background-color: ${({ theme }) =>
      theme.segment.button.hover.backgroundColor};
  }
`;

export const Slider = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "translateX",
})<{
  translateX: number | string;
  $width: number;
}>`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.segment.slider.backgroundColor};
    transition:
      left 0.2s ease-in-out,
      width 0.2s ease-in-out;
    width: ${({ $width }) => `${$width}px`};
    border-radius: 4px;
    box-shadow: ${({ theme }) => theme.shadow.elevation2};
    left: ${({ translateX }) => `${translateX}px`};
  }
`;
