import { CustomError } from './CustomErrors';

export class NotAuthorizedError extends CustomError {
  constructor() {
    super('NOT_AUTHORIZED', 'User not authorized.', 401);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super('NOT_FOUND', message, 404);
  }
}