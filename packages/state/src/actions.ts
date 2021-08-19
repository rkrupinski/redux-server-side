import { ThunkAction } from 'redux-thunk';

import { Resource } from '@rss/shared/src/resource';

import { State, Todo } from './types';

export const setTodos = (todos: Resource<Todo[]>) =>
  ({
    type: '@TODOS/set',
    payload: todos,
  } as const);

export const setCurrentTodo = (todo: Resource<Todo>) =>
  ({
    type: '@CURRENT_TODO/set',
    payload: todo,
  } as const);

export const resetCurrentTodo = () =>
  ({
    type: '@CURRENT_TODO/reset',
  } as const);

const actions = {
  setTodos,
  setCurrentTodo,
  resetCurrentTodo,
};

export type Action = ReturnType<typeof actions[keyof typeof actions]>;

export type AsyncAction = ThunkAction<Promise<void>, State, unknown, Action>;
