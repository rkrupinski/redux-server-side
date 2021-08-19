import * as React from 'react';

import { EmptyObject, ExtractParams, Optionalize } from '@rss/shared/src/types';
import { AsyncAction } from '@rss/state/src/actions';
import { Todo } from '@rss/state/src/types';

export type RouteComponent<R = EmptyObject, P = EmptyObject> = React.FC<P> & {
  resolveDependencies?: AsyncActionCreator<R>;
};

export type RouteParams<T extends string> = {
  [P in ExtractParams<T>[number]]: string;
};

export type Routes<T extends string> = {
  [R in T]: RouteComponent<RouteParams<R>, any>;
};

export type DraftTodo = Optionalize<Todo, 'id'>;

export type AsyncActionCreator<A = EmptyObject> = (arg: A) => AsyncAction;
