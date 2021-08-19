import * as React from 'react';
import styled from '@emotion/styled';

import { Todo } from '@rss/state/src/types';
import { F0, F1, Promisable } from '@rss/shared/src/types';

import { DraftTodo } from '../../types';
import { Button } from '../Button';

const Row = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Buttons = styled(Row)`
  display: grid;
  grid-column-gap: 1rem;
  grid-auto-flow: column;
`;

const TitleInput = styled.textarea`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 7rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 3px;
  color: black;
  resize: none;
  outline: none;
`;

const Checkbox = styled.input`
  margin: 0 0.5rem 0 0;
`;

export type TodoFormProps = {
  initialData?: Todo;
  busy?: boolean;
  onDelete?: F1<Todo, Promisable<void>>;
  onSubmit: F1<DraftTodo, Promisable<void>>;
  onCancel: F0;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  onDelete,
  busy,
}) => {
  const [data, setData] = React.useState<DraftTodo>({
    title: '',
    completed: false,
    ...initialData,
  });

  const formattedData: DraftTodo = React.useMemo(
    () => ({ ...data, title: data.title.trim() }),
    [data],
  );

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.target instanceof HTMLTextAreaElement) {
        setData({
          ...data,
          title: e.target.value,
        });
      } else {
        setData({
          ...data,
          completed: e.target.checked,
        });
      }
    },
    [data, setData],
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formattedData);
    },
    [onSubmit, formattedData],
  );

  const handleDelete = React.useCallback(() => {
    if (!confirm('Are you sure?')) return;
    onDelete?.(data as Todo);
  }, [onDelete, data]);

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <label htmlFor="title">Title:</label>
        <TitleInput
          id="title"
          name="title"
          value={data.title}
          onChange={onChange}
          disabled={busy}
          required
        />
      </Row>

      <Row>
        <Checkbox
          id="completed"
          name="completed"
          type="checkbox"
          onChange={onChange}
          checked={data.completed}
          disabled={busy}
        />
        <label htmlFor="completed">Completed</label>
      </Row>

      <Buttons>
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          disabled={busy}
        >
          Cancel
        </Button>

        {!!onDelete && (
          <Button
            variant="primary"
            type="button"
            disabled={busy}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}

        <Button variant="primary" type="submit" disabled={busy}>
          Save
        </Button>
      </Buttons>
    </form>
  );
};
