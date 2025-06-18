import {FastifyBaseLogger, FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {IncomingMessage, Server, ServerResponse} from 'node:http';
import {ZodTypeProvider} from 'fastify-type-provider-zod';
import {RouteGenericInterface} from 'fastify/types/route';
import {FastifySchema} from 'fastify/types/schema';
import {ContextConfigDefault} from 'fastify/types/utils';

type ServerType = Server

export type FastifyInstanceType = FastifyInstance<ServerType, IncomingMessage, ServerResponse, FastifyBaseLogger, ZodTypeProvider>

export type FastifyValidatedRequest<TSchema extends FastifySchema> = FastifyRequest<RouteGenericInterface, ServerType, IncomingMessage, TSchema, ZodTypeProvider>

export type FastifyValidatedReply<TSchema extends FastifySchema> = FastifyReply<RouteGenericInterface, ServerType, IncomingMessage, ServerResponse, ContextConfigDefault, TSchema, ZodTypeProvider>

export type FastifyValidatedHandler<TSchema extends FastifySchema> = (request: FastifyValidatedRequest<TSchema>, reply: FastifyValidatedReply<TSchema>) => void | Promise<void>
