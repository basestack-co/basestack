import { createGlobalStyle } from "styled-components";

const AppGlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

export default AppGlobalStyle;
