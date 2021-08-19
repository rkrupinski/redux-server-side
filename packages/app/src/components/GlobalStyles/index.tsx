import * as React from 'react';
import { Global, css } from '@emotion/react';

export const GlobalStyles: React.FC = () => (
  <Global
    styles={css`
      html {
        font-size: 16px;
        line-height: 1.5;
      }

      body {
        margin: 0;
        font-family: Comic Sans, Comic Sans MS, cursive;
        color: white;
        background: lightpink;
      }

      a {
        text-decoration: none;
        color: currentColor;
      }

      input,
      textarea {
        font: inherit;
      }
    `}
  />
);
