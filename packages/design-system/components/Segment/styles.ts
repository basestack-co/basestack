import styled from "styled-components";
import { rem } from "polished";
import { space } from "styled-system";

export const Container = styled.div`
  ${space};
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.segment.backgroundColor};
  height: ${rem("36px")};
  border-radius: ${rem("4px")};
  padding: ${rem("4px")};
`;

export const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 1 0 0;
  height: 100%;
  padding: 0 ${rem("12px")};
  z-index: 1;
  border-radius: ${rem("4px")};
  transition: background-color 0.1s ease-in-out;

  &:hover:not(.active) {
    background-color: ${({ theme }) =>
      theme.segment.button.hover.backgroundColor};
  }
`;

export const Slider = styled.div<{
  numberOfItems: number;
  translateX: number | string;
}>`
  position: absolute;
  inset: ${rem("4px")};
  pointer-events: none;
  z-index: 0;

  &::before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.segment.slider.backgroundColor};
    width: calc((100% / ${({ numberOfItems }) => numberOfItems}));
    border-radius: ${rem("4px")};
    box-shadow: ${({ theme }) => theme.shadow.elevation2};
    transition: transform 0.2s ease-in-out;
    transform: translateX(${({ translateX }) => `${translateX}%`});
  }
`;
