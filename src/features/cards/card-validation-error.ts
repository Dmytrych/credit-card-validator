export enum CardValidationErrorCode {
    UnknownError = '001'
}

const errorMessageMapping: Record<CardValidationErrorCode, string> = {
    [CardValidationErrorCode.UnknownError]: "Unknown error",
}

export class CardValidationError extends Error {
  public readonly code: CardValidationErrorCode

  constructor(code: CardValidationErrorCode, message = errorMessageMapping[code] ?? errorMessageMapping[CardValidationErrorCode.UnknownError]) {
    super(message);
    this.code = code
  }
}