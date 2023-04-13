import { createGlobalStyle } from "styled-components";

const LegalGlobalStyle = createGlobalStyle`
  /* Sakura.css v1.4.1
  * ================
  * Minimal css theme.
  * Project: https://github.com/oxalorg/sakura/
  */
  /* Body */
  html {
    font-size: 62.5%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  }

  body {
    font-size: 1.8rem;
    line-height: 1.618;
    max-width: 38em;
    margin: auto;
    color: #4a4a4a;
    background-color: #f9f9f9;
    padding: 13px;
  }

  @media (max-width: 684px) {
    body {
      font-size: 1.53rem;
    }
  }
  @media (max-width: 382px) {
    body {
      font-size: 1.35rem;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.1;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    font-weight: 700;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
  }

  h1 {
    font-size: 2.35em;
  }

  h2 {
    font-size: 2em;
  }

  h3 {
    font-size: 1.75em;
  }

  h4 {
    font-size: 1.5em;
  }

  h5 {
    font-size: 1.25em;
  }

  h6 {
    font-size: 1em;
  }

  p {
    margin-top: 0px;
    margin-bottom: 2.5rem;
  }

  small, sub, sup {
    font-size: 75%;
  }

  hr {
    border-color: #276ef1;
  }

  a {
    text-decoration: none;
    color: #276ef1;
  }
  a:visited {
    color: #276ef1;
  }
  a:hover {
    color: #982c61;
    border-bottom: 2px solid #4a4a4a;
  }

  ul {
    padding-left: 1.4em;
    margin-top: 0px;
    margin-bottom: 2.5rem;
  }

  li {
    margin-bottom: 0.4em;
  }

  blockquote {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1em;
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    padding-right: 0.8em;
    border-left: 5px solid #276ef1;
    margin-bottom: 2.5rem;
    background-color: #f1f1f1;
  }

  blockquote p {
    margin-bottom: 0;
  }

  img, video {
    height: auto;
    max-width: 100%;
    margin-top: 0px;
    margin-bottom: 2.5rem;
  }

  /* Pre and Code */
  pre {
    background-color: #f1f1f1;
    display: block;
    padding: 1em;
    overflow-x: auto;
    margin-top: 0px;
    margin-bottom: 2.5rem;
    font-size: 0.9em;
  }

  code, kbd, samp {
    font-size: 0.9em;
    padding: 0 0.5em;
    background-color: #f1f1f1;
    white-space: pre-wrap;
  }

  pre > code {
    padding: 0;
    background-color: transparent;
    white-space: pre;
    font-size: 1em;
  }

  /* Tables */
  table {
    text-align: justify;
    width: 100%;
    border-collapse: collapse;
  }

  td, th {
    padding: 0.5em;
    border-bottom: 1px solid #f1f1f1;
  }

  /* Buttons, forms and input */
  input, textarea {
    border: 1px solid #4a4a4a;
  }
  input:focus, textarea:focus {
    border: 1px solid #276ef1;
  }

  textarea {
    width: 100%;
  }

  .button, button, input[type=submit], input[type=reset], input[type=button] {
    display: inline-block;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    background-color: #276ef1;
    color: #f9f9f9;
    border-radius: 1px;
    border: 1px solid #276ef1;
    cursor: pointer;
    box-sizing: border-box;
  }
  .button[disabled], button[disabled], input[type=submit][disabled], input[type=reset][disabled], input[type=button][disabled] {
    cursor: default;
    opacity: 0.5;
  }
  .button:focus:enabled, .button:hover:enabled, button:focus:enabled, button:hover:enabled, input[type=submit]:focus:enabled, input[type=submit]:hover:enabled, input[type=reset]:focus:enabled, input[type=reset]:hover:enabled, input[type=button]:focus:enabled, input[type=button]:hover:enabled {
    background-color: #982c61;
    border-color: #982c61;
    color: #f9f9f9;
    outline: 0;
  }

  textarea, select, input {
    color: #4a4a4a;
    padding: 6px 10px; /* The 6px vertically centers text on FF, ignored by Webkit */
    margin-bottom: 10px;
    background-color: #f1f1f1;
    border: 1px solid #f1f1f1;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
  }
  textarea:focus, select:focus, input:focus {
    border: 1px solid #276ef1;
    outline: 0;
  }

  input[type=checkbox]:focus {
    outline: 1px dotted #276ef1;
  }

  label, legend, fieldset {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
`;

export default LegalGlobalStyle;
