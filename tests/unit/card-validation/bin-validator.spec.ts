import { BinValidator } from '../../../src/features/cards/card-validation/bin-validator'

const CARD_NUMBER = '1234567890123456'
const SIX_DIGIT_BIN = CARD_NUMBER.substring(0, 6)
const EIGHT_DIGIT_BIN = CARD_NUMBER.substring(0, 8)

describe('BinValidator', () => {
	const setup = (validBin?: string) => {
		const binDataSource = {
			isValid: jest.fn(async (bin: string) => Promise.resolve(validBin === bin)),
		}
		const validator = new BinValidator({ binDataSource })
		return { validator, binDataSource }
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should return true if 6-digit BIN is valid', async () => {
		const { validator, binDataSource } = setup(SIX_DIGIT_BIN)

		const result = await validator.validate(CARD_NUMBER)

		expect(result).toBe(true)
		expect(binDataSource.isValid).toHaveBeenCalledWith(SIX_DIGIT_BIN)
		expect(binDataSource.isValid).not.toHaveBeenCalledWith(EIGHT_DIGIT_BIN)
	})

	it('should return true if 8-digit BIN is valid but 6-digit is not', async () => {
		const { validator, binDataSource } = setup(EIGHT_DIGIT_BIN)

		const result = await validator.validate(CARD_NUMBER)

		expect(result).toBe(true)
		expect(binDataSource.isValid).toHaveBeenCalledTimes(2)
		expect(binDataSource.isValid).toHaveBeenNthCalledWith(1, SIX_DIGIT_BIN)
		expect(binDataSource.isValid).toHaveBeenNthCalledWith(2, EIGHT_DIGIT_BIN)
	})

	it('should return false if no BIN is valid', async () => {
		const { validator, binDataSource } = setup()

		const result = await validator.validate(CARD_NUMBER)

		expect(result).toBe(false)
		expect(binDataSource.isValid).toHaveBeenCalledWith(SIX_DIGIT_BIN)
		expect(binDataSource.isValid).toHaveBeenCalledWith(EIGHT_DIGIT_BIN)
	})

	it('should short-circuit and return true after first match', async () => {
		const { validator, binDataSource } = setup(SIX_DIGIT_BIN)

		const result = await validator.validate(CARD_NUMBER)

		expect(result).toBe(true)
		expect(binDataSource.isValid).toHaveBeenCalledTimes(1)
	})

	it('should handle short card numbers gracefully', async () => {
		const { validator, binDataSource } = setup(SIX_DIGIT_BIN)

		const shortCard = '123'

		const result = await validator.validate(shortCard)

		expect(result).toBe(false)
		expect(binDataSource.isValid).toHaveBeenCalledWith('123')
	})
})
