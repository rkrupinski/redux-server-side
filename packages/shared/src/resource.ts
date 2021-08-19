export type Resource<T> =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'ready'; data: T }
  | { type: 'error'; reason: string };
