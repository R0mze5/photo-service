import { createGlobalStyle } from "styled-components";
import Theme from "./Theme";
import reset from "styled-reset";

export default createGlobalStyle<{ theme: typeof Theme }>`
  ${reset};
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

  * {
    box-sizing: border-box;
  }

  body{
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.blackColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
  }

  a{
    color: ${({ theme }) => theme.blueColor};
    text-decoration: none
  }

  input:focus {
    outline: none;
  }
  `;
