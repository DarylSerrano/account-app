import fetch from "cross-fetch";

type FetchOptions = {
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
    body?: any,
}

const BASE_URL = "http://127.0.0.1:8080/api";

async function makeFetch<T>(url: string, options?: FetchOptions) {
  const response = await fetch(url, {...options});

  if (!response.ok) {
    throw new Error(`Error fetching: ${url} status: ${response.statusText}`);
  }

  const body: T = await response.json();

  return body;
}

export default { makeFetch, BASE_URL };
