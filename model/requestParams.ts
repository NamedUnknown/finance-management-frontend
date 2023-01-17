export interface RequestParams {
  apiUrl: string;
  headers?: Map<string, Object>;
  body?: Object;
  method: string;
  credentials?: string;
}

export function getHeaders(jsonHeaders: Map<string,Object>): HeadersInit {
  const headers: HeadersInit = new Headers();
  if (jsonHeaders != null) {
    jsonHeaders.forEach((value: string, key: string) => {
      headers.set(key, value);
    })
  }
  return headers;
}