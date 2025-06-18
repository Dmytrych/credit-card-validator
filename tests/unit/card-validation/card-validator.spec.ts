import { ICardValidationParams } from '../../../src/features/cards/types'
import { IBinValidator } from '../../../src/features/cards/card-validation/bin-validator'
import { CardValidator } from '../../../src/features/cards/card-validation/card-validator'
import * as utils from '../../../src/features/cards/card-validation/utils'
import { CardValidationError, CardValidationErrorCode } from '../../../src/features/cards/card-validation/card-validation-error'

const createMockBinValidator = (isValid: boolean): IBinValidator => ({
	validate: jest.fn().mockResolvedValue(isValid),
})

const VALID_CARD = '4111111111111111'
const INVALID_CARD_WITH_LETTERS = '41111111a1111111'
const INVALID_LUHN_CARD = '4211111111111911'

const validParams: ICardValidationParams = {
	cardNumber: VALID_CARD,
	expirationMonth: 12,
	expirationYear: new Date().getFullYear() + 1,
}

describe('CardValidator', () => {
	const setup = (binValid = true) => {
		const binValidator = createMockBinValidator(binValid)
		const validator = new CardValidator({ binValidator })
		return { validator, binValidator }
	}

	beforeEach(() => {
		jest.restoreAllMocks()
	})

	it('should not throw errors with valid params', async () => {
		const { validator } = setup(true)
		await expect(validator.validateOrThrow(validParams)).resolves.toBeUndefined()
	})

	it('should throw InvalidExpirationMonth for month < 1', async () => {
		const { validator } = setup()
		const params = { ...validParams, expirationMonth: 0 }

		await expect(validator.validateOrThrow(params)).rejects.toThrow(
			new CardValidationError(CardValidationErrorCode.InvalidExpirationMonth)
		)
	})

	it('should throw InvalidExpirationMonth for month > 12', async () => {
		const { validator } = setup()
		const params = { ...validParams, expirationMonth: 13 }

		await expect(validator.validateOrThrow(params)).rejects.toThrow(
			new CardValidationError(CardValidationErrorCode.InvalidExpirationMonth)
		)
	})

	it('should throw InvalidExpirationYear if year <= 0', async () => {
		const { validator } = setup()
		const params = { ...validParams, expirationYear: 0 }

		await expect(validator.validateOrThrow(params)).rejects.toThrow(
			new CardValidationError(CardValidationErrorCode.InvalidExpirationYear)
		)
	})

	it('should throw CardExpired if expiration is in the past', async () => {
		const { validator } = setup()
		const params = {
			...validParams,
			expirationMonth: 1,
			expirationYear: 2000,
		}

		await expect(validator.validateOrThrow(params)).rejects.toThrow(
			new CardValidationError(CardValidationErrorCode.CardExpired)
		)
	})

	it('should throw InvalidCardNumber if card contains non-number characters', async () => {
		const { validator } = setup()
		const params = { ...validParams, cardNumber: INVALID_CARD_WITH_LETTERS }

		await expect(validator.validateOrThrow(params)).rejects.toThrow(
			new CardValidationError(CardValidationErrorCode.InvalidCardNumber)
		)
	})

	it('should re-throw unknown error from parseNumberString', async () => {
		const customError = new Error('Unexpected failure')
		jest.spyOn(utils, 'parseNumberString').mockImplementation(() => {
			throw customError
		})

		const { validator } = setup()
		const params = { ...validParams }

		await expect(validator.validateOrThrow(params)).rejects.toThrow(customError)
	})

	it('should throw InvalidCardNumber if Luhn check fails', async () => {
		const params = { ...validParams, cardNumber: INVALID_LUHN_CARD }

		const { validator } = setup()
		await expect(validator.validateOrThrow(params)).rejects.toThrow(
			new CardValidationError(CardValidationErrorCode.InvalidCardNumber)
		)
	})

	it('should throw InvalidCardNumber if binValidator returns false', async () => {
		const { validator } = setup(false)
		await expect(validator.validateOrThrow(validParams)).rejects.toThrow(
			new CardValidationError(CardValidationErrorCode.InvalidCardNumber)
		)
	})
})
