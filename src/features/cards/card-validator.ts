import { CardValidationError, CardValidationErrorCode } from "./card-validation-error"
import { ICardValidationParams } from "./types"

export interface ICardValidator {
    validateOrThrow(params: ICardValidationParams): void
}

export class CardValidator implements ICardValidator {
    public validateOrThrow(params: ICardValidationParams): void {
        if (params.cardNumber.length < 15) {
            throw new CardValidationError(CardValidationErrorCode.UnknownError)
        }
    }
}