import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { RouteComponent, DraftTodo } from '../../types';
import { useDispatch } from '../../hooks';
import { addTodo } from '../../actions';
import { Layout } from '../../components/Layout';
import { TodoForm } from '../../components/TodoForm';

export const NewTodo: RouteComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [busy, setBusy] = React.useState(false);

  const onSubmit = React.useCallback(
    async (data: DraftTodo) => {
      setBusy(true);

      try {
        await dispatch(addTodo(data));
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
    <Layout title="Create todo">
      <h2>New todo</h2>
      <TodoForm onSubmit={onSubmit} onCancel={onCancel} busy={busy} />
    </Layout>
  );
};
