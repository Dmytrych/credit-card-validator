import {FastifyError, FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

const GENERAL_ERROR_MESSAGE = 'Internal error'

export const getErrorHandler = (exposeMessages: boolean = false) => function (this:FastifyInstance, error: FastifyError, _: FastifyRequest, reply: FastifyReply) {
  const statusCode = error.statusCode || 500;

  this.log.error(error.message, {
    error
  })

  reply.status(statusCode).send({
    message: exposeMessages ? error.message : GENERAL_ERROR_MESSAGE,
  });
}
