import { Todo } from '@rss/state/src/types';
import { makeRequest } from '@rss/shared/src/request';

import { DraftTodo } from './types';

export const fetchTodos = () =>
  makeRequest<Todo[]>(`${process.env.API_URL}/todos`);

export const fetchTodo = (todoId: string) =>
  makeRequest<Todo>(`${process.env.API_URL}/todos/${todoId}`);

export const createTodo = (data: DraftTodo) =>
  makeRequest(`${process.env.API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const deleteTodo = (todoId: string) =>
  makeRequest(`${process.env.API_URL}/todos/${todoId}`, {
    method: 'DELETE',
  });

export const updateTodo = ({ id, ...data }: Todo) =>
  makeRequest<Todo>(`${process.env.API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
