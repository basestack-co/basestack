import { css } from "styled-components";
import { darken } from "polished";

/**
 * Small styled custom styled scroll bar
 */

export const useSmallStyledScrollbar = (
  backgroundColor?: string,
  thumbColor?: string
) => css`
  /* width */
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      backgroundColor || darken(0.05, theme.colors.primary)};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => thumbColor || theme.colors.secondary};
  }
`;

/**
 * Clamp text one or more lines
 */

export const useLineClamp = (numberOfLines = 1) => css`
  ${numberOfLines > 1
    ? css`
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${numberOfLines};
        overflow: hidden;
      `
    : css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
`;
