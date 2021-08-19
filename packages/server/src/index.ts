import express from 'express';
import { resolve } from 'path';
import { config } from 'dotenv';
import { Metafile } from 'esbuild';

import { RequestError } from '@rss/shared/src/request';
import { configureStore } from '@rss/state/src/serverStore';
import meta from '@rss/client/_meta.json';

import { renderApp } from './app';
import { renderDocument } from './document';
import { getRoute, minifyHTML } from './utils';
import { api } from './api';

config({ path: resolve(__dirname, '../../../.env') });

const app = express();

app.use('/assets', express.static(resolve(__dirname, '../../client/dist')));

app.use('/api', api);

app.use(async (req, res) => {
  const route = getRoute(req.url);
  const store = configureStore();

  let error: any;

  if (route) {
    const [match, component] = route;

    try {
      await store.dispatch(
        component.resolveDependencies?.(match.params) as any,
      );
    } catch (err) {
      error = err;
      // Error already handled
    }
  }

  const { html, head } = renderApp(req.url, store);
  const state = store.getState();

  const documentHTML = renderDocument({
    html,
    head,
    state,
    meta: meta as Metafile,
  });

  res
    .status(route ? (error instanceof RequestError ? error.status : 200) : 404)
    .send(minifyHTML(documentHTML));
});

app.listen(Number(process.env.SERVER_PORT), () => {
  console.log(`Server running at ${process.env.SERVER_PORT}`);
});
