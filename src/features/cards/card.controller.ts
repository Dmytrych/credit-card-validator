import {FastifyValidatedHandler} from '../../common/types/api';
import { CardValidationError } from './card-validation/card-validation-error';
import { CardValidationSchemaType } from './card-validation.schema';
import { ICardValidator } from './card-validation/card-validator';

type CardControllerDependencies = {
  cardValidator: ICardValidator
}

export class CardController {
	private readonly cardValidator: ICardValidator

	constructor(deps: CardControllerDependencies) {
		this.cardValidator = deps.cardValidator
	}

	validate: FastifyValidatedHandler<CardValidationSchemaType> = async (request, reply) => {
		try {
			await this.cardValidator.validateOrThrow(request.body)

			reply.code(200).send({
				valid: true
			})
		} catch (err: unknown) {
			if (err instanceof CardValidationError) {
				reply.code(400).send({
					valid: false,
					error: {
						code: err.code,
						message: err.message
					}
				})
				return
			}
			throw err
		}
	}
}
