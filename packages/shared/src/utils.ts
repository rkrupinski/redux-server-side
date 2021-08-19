export const keys = <T extends string>(obj: Readonly<Record<T, any>>): T[] =>
  Object.keys(obj) as any;
