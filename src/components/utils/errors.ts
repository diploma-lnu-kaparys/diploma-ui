export class ErrorWithCode extends Error {
  code: string;

  constructor(code: string, ...args: any) {
    super(...args);
    this.code = code;
  }
}

export interface ErrorWithStatus {
  status: number;
  title: string;
  trace?: {
    error?: string;
  };
}

export interface BadRequestError extends ErrorWithStatus {
  status: 400;
  errors: Record<string, string[]>;
}

export const isErrorWithStatus = (error: any): error is ErrorWithStatus =>
  error && "status" in error && "title" in error;

export const isBadRequestError = (
  error: ErrorWithStatus
): error is BadRequestError =>
  isErrorWithStatus(error) && error.status === 400 && "errors" in error;
