import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle<any>`
    *,
    *:before,
    *:after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
        background: "#e8e4e6";
        font-family: 'Roboto', sans-serif;
    }
`;

export default GlobalStyle;
