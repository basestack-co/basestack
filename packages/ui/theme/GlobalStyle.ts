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
      font-family: ${({ theme }) => theme.typography.fontFamily};
      background-color: ${({ theme }) => theme.colors.bg1};
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
`;

export default GlobalStyle;
