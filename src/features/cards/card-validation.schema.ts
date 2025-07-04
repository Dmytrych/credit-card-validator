import {z } from 'zod';

const cardValidationBody = z.object({
	cardNumber: z.string(),
	expirationMonth: z.number(),
	expirationYear: z.number()
})

const cardValidationResponseSchema = z.object({
	valid: z.boolean(),
	error: z.object({
		code: z.string(),
		message: z.string()
	}).optional()
})

export const cardValidationSchema = {
	body: cardValidationBody,
	response: {
		200: cardValidationResponseSchema,
		400: cardValidationResponseSchema
	},
}

export type CardValidationSchemaType = typeof cardValidationSchema
