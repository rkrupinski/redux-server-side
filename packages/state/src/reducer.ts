import { combineReducers, Reducer } from 'redux';
import { Resource } from '@rss/shared/src/resource';

import { State, Todo } from './types';
import { Action } from './actions';

const todosReducer: Reducer<Resource<Todo[]>, Action> = (
  state = { type: 'idle' },
  action,
) => {
  switch (action.type) {
    case '@TODOS/set':
      return action.payload;

    default:
      return state;
  }
};

const currentTodoReducer: Reducer<Resource<Todo>, Action> = (
  state = { type: 'idle' },
  action,
) => {
  switch (action.type) {
    case '@CURRENT_TODO/set':
      return action.payload;

    case '@CURRENT_TODO/reset':
      return { type: 'idle' };

    default:
      return state;
  }
};

export const rootReducer = combineReducers<State, Action>({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
});
