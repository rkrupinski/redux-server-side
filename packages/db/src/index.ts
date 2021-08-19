import { resolve } from 'path';
import jsonServer from 'json-server';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../../.env') });

const server = jsonServer.create();

const router = jsonServer.router(
  resolve(__dirname, '../data', `${process.env.DB_FILE}`),
);

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(Number(process.env.DB_PORT), () => {
  console.log(`DB running at ${process.env.DB_PORT}`);
});
