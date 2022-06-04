import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
      --top-nav-height: 51px;
      --border-color: #dce6e9;
    }
    
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    
    body {
      font-family: ${({ theme }) => theme.typography.fontFamily};
      background-color: ${({ theme }) => theme.colors.gray50};
      color: rgba(60, 66, 87, 1);
      margin: 0;
    }
    
    p {
      line-height: 1.5em;
    }
    
    
    h1 {
      font-size: 40px;
    }
    
    h2 {
      margin: 1.5em 0;
    }
    
    a {
      color: rgba(75, 85, 99, 1);
    }
`;

export default GlobalStyle;
