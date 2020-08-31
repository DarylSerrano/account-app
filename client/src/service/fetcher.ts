import fetch from "cross-fetch";

type FetchOptions = {
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
    body?: any
}

async function makeFetch<T>(url: string, options?: FetchOptions) {
  const response = await fetch(url, {...options});

  if (!response.ok) {
    throw new Error(`Error fetching: ${url} status: ${response.statusText}`);
  }

  const body: T = await response.json();

  return body;
}

export default { makeFetch };
