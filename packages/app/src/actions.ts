import { setTodos, setCurrentTodo } from '@rss/state/src/actions';
import { Todo } from '@rss/state/src/types';

import {
  fetchTodos,
  fetchTodo,
  createTodo,
  deleteTodo,
  updateTodo,
} from './service';
import { DraftTodo, AsyncActionCreator } from './types';

export const getTodos: AsyncActionCreator = () => async dispatch => {
  dispatch(setTodos({ type: 'loading' }));

  try {
    dispatch(setTodos({ type: 'ready', data: await fetchTodos() }));
  } catch (err) {
    dispatch(setTodos({ type: 'error', reason: err.message }));
    throw err;
  }
};

export const getTodo: AsyncActionCreator<{ todoId: string }> =
  ({ todoId }) =>
  async dispatch => {
    dispatch(setCurrentTodo({ type: 'loading' }));

    try {
      dispatch(
        setCurrentTodo({ type: 'ready', data: await fetchTodo(todoId) }),
      );
    } catch (err) {
      dispatch(setCurrentTodo({ type: 'error', reason: err.message }));
      throw err;
    }
  };

export const addTodo: AsyncActionCreator<DraftTodo> = data => async () => {
  await createTodo(data);
};

export const removeTodo: AsyncActionCreator<{ todoId: string }> =
  ({ todoId }) =>
  async () => {
    await deleteTodo(todoId);
  };

export const editTodo: AsyncActionCreator<Todo> = data => async () => {
  await updateTodo(data);
};
