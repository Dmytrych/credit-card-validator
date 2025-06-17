export enum CardValidationErrorCode {
    InvalidCardNumber = '001',
    CardExpired = '002',
    UnknownError = '004',
}

const errorMessageMapping: Record<CardValidationErrorCode, string> = {
    [CardValidationErrorCode.InvalidCardNumber]: "Invalid card number",
    [CardValidationErrorCode.UnknownError]: "Unknown error",
    [CardValidationErrorCode.CardExpired]: "Card expired"
}

export class CardValidationError extends Error {
  public readonly code: CardValidationErrorCode

  constructor(code: CardValidationErrorCode, message = errorMessageMapping[code] ?? errorMessageMapping[CardValidationErrorCode.UnknownError]) {
    super(message);
    this.code = code
  }
}