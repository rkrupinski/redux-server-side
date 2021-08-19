export type EmptyObject = Record<PropertyKey, never>;

export type Optionalize<T, O extends keyof T> = Omit<T, O> &
  {
    [K in O]?: T[K];
  };

export type TypedOmit<T, K extends keyof T> = Omit<T, K>;

export type ExtractParams<T, P extends string[] = []> = T extends ''
  ? P
  : T extends `${any}:${infer N}`
  ? N extends `${infer A}/${infer R}`
    ? ExtractParams<R, [...P, A]>
    : [...P, N]
  : P;

export type F0<R = void> = () => R;
export type F1<A1, R = void> = (arg1: A1) => R;

export type Promisable<T> = T | Promise<T>;
