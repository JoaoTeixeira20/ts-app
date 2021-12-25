import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  width: calc(100vw - (100vw - 100%));
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
`;

export default GlobalStyle;
