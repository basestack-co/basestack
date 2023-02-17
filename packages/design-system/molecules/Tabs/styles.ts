import styled from "styled-components";
import { rem } from "polished";
import { space } from "styled-system";

export const Container = styled.div<{ backgroundColor?: string }>`
  ${space};
  display: flex;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.colors.white};
  position: relative;
`;

export const Button = styled.button<{
  borderColor?: string;
  hoverBgColor?: string;
}>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  height: ${rem("44px")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 0;
  padding: 0 ${rem("12px")};
  transition: background-color 0.1s ease-in-out;
  border-bottom: 2px solid
    ${({ theme, borderColor }) => borderColor || theme.colors.gray200};

  &:hover {
    background-color: ${({ theme, hoverBgColor }) =>
      hoverBgColor || theme.colors.gray100};
  }
`;

export const Slider = styled.div<{
  numberOfItems: number;
  translateX: number | string;
  activeBorderColor?: string;
}>`
  position: absolute;
  pointer-events: none;
  z-index: 2;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, activeBorderColor }) =>
    activeBorderColor || theme.colors.black};
  height: 2px;
  width: calc((100% / ${({ numberOfItems }) => numberOfItems}));
  transition: transform 0.2s ease-in-out;
  transform: translateX(${({ translateX }) => `${translateX}%`});
`;
