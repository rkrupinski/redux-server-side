import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { TypedOmit } from '@rss/shared/src/types';
import { RouteComponent, RouteParams } from '@rss/app/src/types';

import { makeResolver } from '../../resolver';

export type ClientRouteProps<T extends string> = TypedOmit<
  RouteProps,
  'component' | 'children' | 'path'
> & {
  path?: T;
  component: RouteComponent<RouteParams<T>>;
};

export const makeClientRoute = () => {
  const resolver = makeResolver();

  return function ClientRoute<T extends string>({
    component,
    ...rest
  }: React.PropsWithChildren<ClientRouteProps<T>>): JSX.Element {
    return <Route component={resolver(component)} {...rest} />;
  };
};
