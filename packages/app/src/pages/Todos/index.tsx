import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import { RouteComponent } from '../../types';
import { useSelector } from '../../hooks';
import { getTodos } from '../../actions';
import { Layout } from '../../components/Layout';
import { Button } from '../../components/Button';
import { Message } from '../../components/Message';
import { Link } from '../../components/Link';

const Badge = styled.span`
  margin-right: 0.5rem;
  cursor: default;
  -webkit-text-stroke: 1px white;
`;

const Completed = styled(Badge)`
  color: white;
`;

const Pending = styled(Badge)`
  color: transparent;
  opacity: 0.5;
`;

const List = styled.ul`
  padding: 0;
  margin: 0 0 2rem;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px dashed white;
  }
`;

const CheckMark = styled.span`
  flex: none;
`;

const TodoBody = styled.div`
  flex: 1;
  min-width: 0;
  word-wrap: break-word;
`;

const Todos: RouteComponent = () => {
  const history = useHistory();
  const todos = useSelector(({ todos }) => todos);

  const onNewTodo = React.useCallback(() => {
    history.push('/new');
  }, [history]);

  return (
    <Layout>
      {todos.type === 'error' && <Message text={todos.reason} />}

      {todos.type === 'ready' && !todos.data.length && (
        <Message text="No todos yet" />
      )}

      {todos.type === 'ready' && !!todos.data.length && (
        <List>
          {todos.data.map(({ id, title, completed }) => (
            <ListItem key={id}>
              <CheckMark>
                {React.createElement(
                  completed ? Completed : Pending,
                  null,
                  '✔',
                )}
              </CheckMark>
              <TodoBody>
                <Link to={`/todo/${id}`}>{title}</Link>
              </TodoBody>
            </ListItem>
          ))}
        </List>
      )}

      {todos.type === 'ready' && (
        <Button variant="primary" type="button" onClick={onNewTodo}>
          New todo
        </Button>
      )}
    </Layout>
  );
};

Todos.resolveDependencies = getTodos;

export { Todos };
