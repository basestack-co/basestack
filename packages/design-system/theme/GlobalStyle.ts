"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    *:before,
    *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: ${({ theme }) => theme.typography.roboto};
        ${({ theme }) =>
          `background-color: ${
            theme.colors[theme.isDarkMode ? "gray900" : "gray50"]
          };`}
    }

    button,
    input,
    textarea {
        font-family: inherit;
    }

    button,
    a {
        -webkit-tap-highlight-color: transparent;
    }

    ul {
        list-style-type: none;
    }

    input,
    textarea,
    button,
    select,
    a {
        -webkit-tap-highlight-color: transparent;
    }

    ${() =>
      typeof window !== "undefined" &&
      `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `}
`;

export default GlobalStyle;
