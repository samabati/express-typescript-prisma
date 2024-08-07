import { ErrorCode, HttpException } from "./root";

export class BadException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 400, null);
  }
}
