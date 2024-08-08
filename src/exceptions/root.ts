export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: any;
  constructor(
    message: string,
    errorCode: any,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  USER_ALREADY_EXISTS = 1001,
  UNPROCESSABLE_ENTITY = 1002,
  INTERNAL_ERROR = 1003,
  USER_NOT_FOUND = 1004,
  INCORRECT_PASSWORD = 1005,
  UNAUTHORIZED_USER = 1006,
}
