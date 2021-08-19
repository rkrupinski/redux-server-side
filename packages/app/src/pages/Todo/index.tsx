import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Todo } from '@rss/state/src/types';
import { resetCurrentTodo } from '@rss/state/src/actions';

import { DraftTodo, RouteComponent } from '../../types';
import { useSelector, useDispatch } from '../../hooks';
import { getTodo, removeTodo, editTodo } from '../../actions';
import { Layout } from '../../components/Layout';
import { TodoForm } from '../../components/TodoForm';
import { Message } from '../../components/Message';

const Todo: RouteComponent<{ todoId: string }> = () => {
  const currentTodo = useSelector(({ currentTodo }) => currentTodo);
  const history = useHistory();
  const dispatch = useDispatch();
  const [busy, setBusy] = React.useState(false);

  const onSubmit = React.useCallback(
    async (data: DraftTodo) => {
      setBusy(true);

      try {
        await dispatch(editTodo(data as Todo));
        history.push('/');
      } catch (err) {
        setBusy(false);
        alert(err.message);
      }
    },
    [dispatch, history],
  );

  const onDelete = React.useCallback(
    async ({ id: todoId }: Todo) => {
      setBusy(true);

      try {
        await dispatch(removeTodo({ todoId }));
        dispatch(resetCurrentTodo());
        history.push('/');
      } catch (err) {
        setBusy(false);
        alert(err.message);
      }
    },
    [dispatch, history],
  );

  const onCancel = React.useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Layout
      title={currentTodo.type === 'ready' ? currentTodo.data.title : undefined}
    >
      {currentTodo.type === 'error' && <Message text={currentTodo.reason} />}

      {currentTodo.type === 'ready' && (
        <>
          <h2>Edit todo</h2>
          <TodoForm
            initialData={currentTodo.data}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onCancel={onCancel}
            busy={busy}
          />
        </>
      )}
    </Layout>
  );
};

Todo.resolveDependencies = getTodo;

export { Todo };
