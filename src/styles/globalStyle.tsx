import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
`;

export default GlobalStyle;
