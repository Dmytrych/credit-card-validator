import {FastifySchema} from 'fastify/types/schema';
import {AwilixContainer} from 'awilix';
import {FastifyValidatedHandler} from '../types/api';

type InjectionCB<TSchema extends FastifySchema> = (container: AwilixContainer) => FastifyValidatedHandler<TSchema>

export const injectionHandler = <TSchema extends FastifySchema>(injectionCb: InjectionCB<TSchema>): FastifyValidatedHandler<TSchema> => {
	return (request, reply) => {
		const handler = (injectionCb(request.diScope))
		return handler(request, reply)
	}
}
