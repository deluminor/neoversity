export type QueryParamValue = string | number | undefined;

export type QueryParams = Record<string, QueryParamValue>;

export interface RequestOptions {
  params?: QueryParams;
  method?: "GET" | "POST";
  body?: unknown;
  signal?: AbortSignal;
}
