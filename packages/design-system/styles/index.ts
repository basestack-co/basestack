import { css } from "styled-components";

export const scrollbar = css`
  /* width */
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray700" : "gray100"]};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray600" : "gray300"]};
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray500" : "gray400"]};
  }
`;
