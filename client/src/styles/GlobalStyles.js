import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        background-color: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
          Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    `}
  />
);

export default GlobalStyles; 