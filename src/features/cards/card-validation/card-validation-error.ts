export enum CardValidationErrorCode {
    InvalidCardNumber = '001',
    CardExpired = '002',
    InvalidExpirationMonth = '003',
    InvalidExpirationYear = '004',
    UnknownError = '005',
}

const errorMessageMapping: Record<CardValidationErrorCode, string> = {
    [CardValidationErrorCode.InvalidCardNumber]: "Invalid card number",
    [CardValidationErrorCode.UnknownError]: "Unknown error",
    [CardValidationErrorCode.InvalidExpirationMonth]: "Invalid expiration month",
    [CardValidationErrorCode.InvalidExpirationYear]: "Invalid expiration year",
    [CardValidationErrorCode.CardExpired]: "Card expired"
}

export class CardValidationError extends Error {
  public readonly code: CardValidationErrorCode

  constructor(code: CardValidationErrorCode, message = errorMessageMapping[code] ?? errorMessageMapping[CardValidationErrorCode.UnknownError]) {
    super(message);
    this.code = code
  }
}