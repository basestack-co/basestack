import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    *:before,
    *:after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html,
    body {
      height: 100%;
    }
    
    body {
      font-family: ${({ theme }) => theme.typography.roboto};
      ${({ theme }) =>
        typeof window !== "undefined" &&
        `background-color: ${
          theme.colors[theme.isDarkMode ? "gray900" : "gray50"]
        };`}
    }
    
    #__next {
      min-height: 100%;
      display: flex;
      flex-direction: column;
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
`;

export default GlobalStyle;
