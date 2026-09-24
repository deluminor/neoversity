import { REQUEST_TIMEOUT_MS } from "@/constants/api";
import { API_BASE_URL } from "@/lib/env";
import { logError } from "@/lib/logger";
import type { QueryParams, RequestOptions } from "@/types/api";

import { ApiError } from "./api-error";

function buildUrl(path: string, params?: QueryParams): string {
  const url = new URL(path, API_BASE_URL);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

function fallbackErrorMessage(response: Response): string {
  return response.statusText || `Request failed with status ${response.status}`;
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const payload: unknown = await response.json();

    if (
      payload !== null &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
    ) {
      return payload.message;
    }
  } catch {
    return fallbackErrorMessage(response);
  }

  return fallbackErrorMessage(response);
}

export async function request(path: string, options: RequestOptions = {}): Promise<unknown> {
  const { params, method = "GET", body, signal } = options;
  const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);

  const response = await fetch(buildUrl(path, params), {
    method,
    signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
    cache: "no-store",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await readErrorMessage(response));
  }

  return response.json();
}

export function parseResponse<T>(schema: { parse: (data: unknown) => T }, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    logError("Unexpected API response shape", error);
    throw new ApiError(502, "Unexpected response from the server.");
  }
}
