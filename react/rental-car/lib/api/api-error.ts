import { logError } from "@/lib/logger";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}

const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";

export function toUserMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  logError("Unexpected error", error);
  return GENERIC_ERROR_MESSAGE;
}
