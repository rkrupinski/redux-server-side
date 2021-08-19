import { Resource } from '@rss/shared/src/resource';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type State = {
  todos: Resource<Todo[]>;
  currentTodo: Resource<Todo>;
};
