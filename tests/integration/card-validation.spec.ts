import { createTestServer } from '../utils/create-test-server'
import request from 'supertest'
import { FastifyInstance } from 'fastify/types/instance'
import { AxiosInstance } from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { BinResponseData } from '../../src/api/data-sources/bin.data-source'

const BIN_API_SUCCESS_RESPONSE: BinResponseData = {
	Status: "SUCCESS"
}

const BIN_API_NOT_FOUND_RESPONSE: BinResponseData = {
	Status: "NOT FOUND"
}

const FUTURE_YEAR = new Date().getFullYear() + 1

const VALID_CARD_BODY = {
	cardNumber: "4242424242424242",
	expirationMonth: 12,
	expirationYear: FUTURE_YEAR
}

const INVALID_CARD_BODY = {
	cardNumber: "1242424242424242",
	expirationMonth: 12,
	expirationYear: FUTURE_YEAR
}

const INVALID_CARD_NUMBER_RESPONSE = {
	valid: false,
	error: {
		code: '001',
		message: 'Invalid card number'
	}
}

describe('App Integration Tests', () => {
	let app: FastifyInstance
	let binApiAxiosMock: AxiosMockAdapter

	beforeAll(async () => {
		app = await createTestServer()
		await app.ready()

		const binApiInstance = app.diContainer.resolve<AxiosInstance>("binApiAxiosInstance")
		binApiAxiosMock = new AxiosMockAdapter(binApiInstance);
	})

	beforeEach(() => {
		binApiAxiosMock.resetHandlers()
	})

	afterAll(async () => {
		await app.close()
	})

	const getValidateRequest = () => {
		return request(app.server).post('/v1/cards/validate')
	}

	const mockValidBinApiRequest = <TResponse>(statusCode: number = 200, response: BinResponseData | TResponse = BIN_API_SUCCESS_RESPONSE) => {
		binApiAxiosMock.onGet(/bin/).reply(() => {
			return [
				statusCode,
				response,
			];
		})
	}

	it('should return valid response if all params are valid', async () => {
		mockValidBinApiRequest()

		const response = await getValidateRequest()
			.send(VALID_CARD_BODY)

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('valid', true)
		expect(response.body).not.toHaveProperty('error')
	})

	it('should have an error field if given invalid params', async () => {
		mockValidBinApiRequest()

		const response = await getValidateRequest()
			.send(INVALID_CARD_BODY)

		expect(response.status).toBe(400)
		expect(response.body).toMatchObject(INVALID_CARD_NUMBER_RESPONSE)
	})

	it('should return 500 response if BIN API throws an error', async () => {
		binApiAxiosMock.onGet(/bin/).networkError()

		const response = await getValidateRequest()
			.send(VALID_CARD_BODY)

		expect(response.status).toBe(500)
	})

  
	it('should return error if BIN API does not find a BIN', async () => {
		mockValidBinApiRequest(200, BIN_API_NOT_FOUND_RESPONSE)

		const response = await getValidateRequest()
			.send(VALID_CARD_BODY)

		expect(response.status).toBe(400)
		expect(response.body).toMatchObject(INVALID_CARD_NUMBER_RESPONSE)
	})
})