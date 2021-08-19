import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from '@rss/state/src/store';
import { keys } from '@rss/shared/src/utils';
import { routes } from '@rss/app/src/routes';
import { NotFound } from '@rss/app/src/pages/NotFound';
import { GlobalStyles } from '@rss/app/src/components/GlobalStyles';

import { makeClientRoute } from './components/ClientRoute';
import { MutableWindow } from './types';

const ClientRoute = makeClientRoute();

const store = configureStore(window.__PRELOADED_STATE__);

delete (window as MutableWindow).__PRELOADED_STATE__;

hydrate(
  <>
    <GlobalStyles />
    <Provider store={store}>
      <Router>
        <Switch>
          {keys(routes).map(route => (
            <ClientRoute
              key={route}
              path={route}
              component={routes[route] as any}
              exact
              strict
            />
          ))}
          <ClientRoute component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  </>,
  document.querySelector('#root'),
);
