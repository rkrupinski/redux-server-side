export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: string;
      SERVER_PORT: string;
      DB_FILE: string;
      DB_URL: string;
      API_URL: string;
    }
  }
}
