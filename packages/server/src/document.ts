import { Metafile } from 'esbuild';
import { HelmetData } from 'react-helmet';

import { State } from '@rss/state/src/types';
import { F1 } from '@rss/shared/src/types';

export type RenderDocumentProps = {
  html: string;
  head: HelmetData;
  state: State;
  meta: Metafile;
};

export const renderDocument: F1<RenderDocumentProps, string> = ({
  html,
  meta,
  state,
  head,
}) => {
  const scripts = Object.keys(meta.outputs)
    .filter(path => /\.js$/.test(path))
    .map(path => `<script src="${path.replace('dist/', '/assets/')}"></script>`)
    .join('\n');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="data:;base64,iVBORw0KGgo=">
      ${head.title.toString()}
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
          /</g,
          '\\u003c',
        )};
      </script>
      ${scripts}
    </body>
    </html>
  `;
};
