import { rem } from "polished";
import styled, { css } from "styled-components";
import { space } from "styled-system";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<{
  backgroundColor?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.tabs.backgroundColor};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["isButtonGroup", "backgroundColor"].includes(prop),
})<{
  backgroundColor?: string;
  isButtonGroup: boolean;
}>`
  ${space};
  display: flex;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.tabs.backgroundColor};
  position: relative;

  ${({ isButtonGroup }) =>
    isButtonGroup &&
    css`
      gap: 4px;
    `};
`;

const sharedButtonStyles = css`
  border: none;
  cursor: pointer;
  min-width: ${rem("110px")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 0;
  padding: 0 ${rem("12px")};
`;

export const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) => !["hoverBgColor", "borderColor"].includes(prop),
})<{
  borderColor?: string;
  hoverBgColor?: string;
}>`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.tabs.tab.backgroundColor};
  height: ${rem("44px")};
  transition: background-color 0.1s ease-in-out;
  border-bottom: 2px solid
    ${({ theme, borderColor }) => borderColor || theme.tabs.tab.border};

  @media screen and ${({ theme }) => theme.device.min.sm} {
    &:hover {
      background-color: ${({ theme, hoverBgColor }) =>
        hoverBgColor || theme.tabs.tab.hover.backgroundColor};
    }
  }
`;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{
  isActive: boolean;
}>`
  ${sharedButtonStyles};
  border-radius: 4px;
  background-color: ${({ theme, isActive }) =>
    isActive
      ? theme.tabs.button.active.backgroundColor
      : theme.tabs.button.backgroundColor};
  height: ${rem("36px")};
  transition: background-color 0.2s ease-in-out;
  ${({ isActive }) =>
    !isActive &&
    css`
      @media screen and ${({ theme }) => theme.device.min.sm} {
        &:hover {
          background-color: ${({ theme }) =>
            theme.tabs.button.hover.backgroundColor};
        }
      }
    `};
`;

export const Slider = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "backgroundColor",
      "numberOfItems",
      "translateX",
      "activeBorderColor",
    ].includes(prop),
})<{
  numberOfItems: number;
  translateX: number | string;
  activeBorderColor?: string;
}>`
  min-width: ${rem("110px")};
  position: absolute;
  pointer-events: none;
  z-index: 2;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, activeBorderColor }) =>
    activeBorderColor || theme.tabs.slider.backgroundColor};
  height: 2px;
  width: calc((100% / ${({ numberOfItems }) => numberOfItems}));
  transition: transform 0.2s ease-in-out;
  transform: translateX(${({ translateX }) => `${translateX}%`});
`;
