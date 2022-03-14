import { keyframes, css } from "styled-components";

/**
 * Fade Out
 */
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const useFadeOutAnimation = css`
  animation: 0.3s ${fadeOut} ease-out forwards;
`;

/**
 * Fade In
 */
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const useFadeInAnimation = css`
  animation: 0.3s ${fadeIn} ease-in forwards;
`;

interface SlideInBottomProps {
  amount?: number;
  height?: number;
}

/**
 * Slide in bottom
 */
const slideInBottom = ({
  amount = 120,
  height,
}: SlideInBottomProps) => keyframes`
  0% {
    transform: translateY(${amount}px);
    opacity: 0;
    max-height: ${height ? "0" : "initial"};
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    max-height: ${height ? height + "px" : "initial"};
  }
`;

export const useSlideInBottomAnimation = ({
  amount,
  height,
}: SlideInBottomProps) => css`
  animation: ${slideInBottom({ amount, height })} 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
`;

/**
 * Slide out bottom
 */
const slideOutBottom = ({ amount = 120 }: SlideInBottomProps) => keyframes`
  0% {
  transform: translateY(0);
    opacity: 1;
    
  }
  100% {
    transform: translateY(${amount}px);
    opacity: 0;
  }
`;

export const useSlideOutBottomAnimation = ({
  amount,
}: SlideInBottomProps) => css`
  animation: ${slideOutBottom({ amount })} 0.5s
    cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
`;

/**
 * Chevron down flip animation
 */

export const useChevronDownAnimation = (isOpen = false) => css`
  svg {
    transition: transform 0.3s ease-in-out;
    transform: rotateX(${isOpen ? "-180deg" : "0"});
  }
`;
