import 'isomorphic-fetch';

export class RequestError extends Error {
  status = 500;
  setStatus(status: number) {
    this.status = status;
    return this;
  }
}

export const makeRequest = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, init);
  if (response.ok) return response.json();
  throw new RequestError(response.statusText).setStatus(response.status);
};
