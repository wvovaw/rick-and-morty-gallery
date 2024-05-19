export const ERRORS = {
  CHARACTERS_NOT_FOUND: "Characters not found",
  EPISODE_NOT_FOUND: "Requested episode not found",
  UNKNOWN_ERROR: "Unknown error occured",
} as const;

type ApiErrorCode = keyof typeof ERRORS;

export class ApiError extends Error {
  constructor(public code: ApiErrorCode = "UNKNOWN_ERROR") {
    super(ERRORS[code]);
    this.name = "ApiError";
  }
}
