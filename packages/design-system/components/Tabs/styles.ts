import { rem } from "polished";
import styled, { css } from "styled-components";
import { space } from "styled-system";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<{
  backgroundColor?: string;
  borderColor?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.tabs.backgroundColor};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ theme, borderColor }) =>
      borderColor || theme.tabs.tab.border};
    z-index: 0;
  }
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

const sharedButtonStyles = (isCompact: boolean) => css`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${rem("12px")};
  ${isCompact
    ? css`
        flex: auto 0 0;
      `
    : css`
        flex: 1 0 0;
        min-width: ${rem("110px")};
      `}
`;

export const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["hoverBgColor", "borderColor", "isCompact"].includes(prop),
})<{
  borderColor?: string;
  hoverBgColor?: string;
  isCompact?: boolean;
}>`
  ${({ isCompact }) => sharedButtonStyles(isCompact || false)};
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
  shouldForwardProp: (prop) => !["isActive", "isCompact"].includes(prop),
})<{
  isActive: boolean;
  isCompact?: boolean;
}>`
  ${({ isCompact }) => sharedButtonStyles(isCompact || false)};
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
    !["width", "translateX", "activeBorderColor", "isCompact"].includes(prop),
})<{
  width: number;
  translateX: number | string;
  activeBorderColor?: string;
  isCompact?: boolean;
}>`
  min-width: ${({ isCompact }) => (isCompact ? "initial" : rem("110px"))};
  position: absolute;
  pointer-events: none;
  z-index: 2;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, activeBorderColor }) =>
    activeBorderColor || theme.tabs.slider.backgroundColor};
  height: 2px;
  width: ${({ width }) => `${width}px`};
  transition: all 0.2s ease-in-out;
  transform: translateX(${({ translateX }) => `${translateX}px`});
`;
