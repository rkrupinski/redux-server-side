import express from 'express';
import bodyParser from 'body-parser';

import { makeRequest, RequestError } from '@rss/shared/src/request';

const api = express.Router();

api.use(bodyParser.json());

api.get('/todos', async (_req, res, next) => {
  try {
    res.json(await makeRequest(`${process.env.DB_URL}/todos`));
  } catch (err) {
    next(err);
  }
});

api.get('/todos/:todoId', async (req, res, next) => {
  try {
    res.json(
      await makeRequest(`${process.env.DB_URL}/todos/${req.params.todoId}`),
    );
  } catch (err) {
    next(err);
  }
});

api.post('/todos', async (req, res, next) => {
  try {
    res.json(
      await makeRequest(`${process.env.DB_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }),
    );
  } catch (err) {
    next(err);
  }
});

api.delete('/todos/:todoId', async (req, res, next) => {
  try {
    res.json(
      await makeRequest(`${process.env.DB_URL}/todos/${req.params.todoId}`, {
        method: 'DELETE',
      }),
    );
  } catch (err) {
    next(err);
  }
});

api.patch('/todos/:todoId', async (req, res, next) => {
  try {
    const { id: _id, ...data } = req.body;

    res.json(
      await makeRequest(`${process.env.DB_URL}/todos/${req.params.todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    );
  } catch (err) {
    next(err);
  }
});

api.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

api.use(
  (
    err: RequestError,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    res.status(err.status ?? 500).json({ message: err.message });
  },
);

export { api };
