import { CardValidationError, CardValidationErrorCode } from "./card-validation-error"
import { ICardValidationParams } from "../types"
import { checkLuhn } from "./luhn-check"
import { parseNumberString, ParsingError } from "./utils"
import { IBinValidator } from "./bin-validator"

export interface ICardValidatorDependencies {
    binValidator: IBinValidator
}

export interface ICardValidator {
    validateOrThrow(params: ICardValidationParams): Promise<void>
}

export class CardValidator implements ICardValidator {
	private readonly binValidator: IBinValidator

	constructor(deps: ICardValidatorDependencies) {
		this.binValidator = deps.binValidator
	}

	private checkIsMonthValid(month: number): boolean {
		return 1 <= month && month <= 12
	}

	private checkIsExpired(expirationYear: number, expirationMonth: number) {
		const today = new Date()
		const expirationDate = new Date(expirationYear, expirationMonth, 1)

		return today.getTime() > expirationDate.getTime()
	}

	private checkCardNumber(cardNumber: string): boolean {
		try {
			const digits = parseNumberString(cardNumber)
			return checkLuhn(digits)
		} catch (err) {
			if (err instanceof ParsingError) {
				return false
			}
			throw err
		}
	}

	public async validateOrThrow(params: ICardValidationParams): Promise<void> {
		if (!this.checkIsMonthValid(params.expirationMonth)) {
			throw new CardValidationError(CardValidationErrorCode.InvalidExpirationMonth)
		}

		if (params.expirationYear <= 0) {
			throw new CardValidationError(CardValidationErrorCode.InvalidExpirationYear)
		}

		if (this.checkIsExpired(params.expirationYear, params.expirationMonth)) {
			throw new CardValidationError(CardValidationErrorCode.CardExpired)
		}

		if (!this.checkCardNumber(params.cardNumber) || !(await this.binValidator.validate(params.cardNumber))) {
			throw new CardValidationError(CardValidationErrorCode.InvalidCardNumber)
		}
	}
}