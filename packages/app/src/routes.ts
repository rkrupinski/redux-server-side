import { RouteComponent, RouteParams } from './types';
import { Todos } from './pages/Todos';
import { NewTodo } from './pages/NewTodo';
import { Todo } from './pages/Todo';

export type Urls = '/' | '/new' | '/todo/:todoId';

export type Routes = {
  [U in Urls]: RouteComponent<RouteParams<U>>;
};

export const routes: Routes = {
  '/': Todos,
  '/new': NewTodo,
  '/todo/:todoId': Todo,
} as const;
