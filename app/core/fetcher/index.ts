export const fetcher = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};
