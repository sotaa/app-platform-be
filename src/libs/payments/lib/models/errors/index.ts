import { ErrorCodes } from "../../enums";

export class TransactionProcessedError extends Error {
    message = ErrorCodes.TRANSACTION_PROCESSED;
}

export class DatabaseSavingError extends Error {
    message = ErrorCodes.DATABASE_SAVE_ERROR;
}

export class PaymentFailureError extends Error {
    message = ErrorCodes.PAYMENT_FAILURE;
}

export class InvalidPlanIdError extends Error {
    message = ErrorCodes.INVALID_PLAN_ID;
}

export class UserNotFoundError extends Error {
    message = ErrorCodes.USER_NOT_FOUND;
}

export class TransactionKeyNotFoundError extends Error {
    message = ErrorCodes.TRANSACTION_KEY_NOT_FOUND;
}