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
}
