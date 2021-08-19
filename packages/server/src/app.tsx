import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { GlobalStyles } from '@rss/app/src/components/GlobalStyles';
import { NotFound } from '@rss/app/src/pages/NotFound';
import { routes } from '@rss/app/src/routes';
import { State } from '@rss/state/src/types';
import { Action } from '@rss/state/src/actions';

export const renderApp = (url: string, store: Store<State, Action>) => {
  const context = {};

  const html = renderToString(
    <>
      <GlobalStyles />
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <Switch>
            {Object.entries(routes).map(([path, Component]) => (
              <Route
                key={path}
                path={path}
                component={Component}
                strict
                exact
              />
            ))}
            <Route component={NotFound} />
          </Switch>
        </StaticRouter>
      </Provider>
    </>,
  );

  const head = Helmet.renderStatic();

  return { html, head };
};
