import {getErrorResponse} from "../common/utils/response-helpers";
import {FastifyError, FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

export function errorHandler(this:FastifyInstance, error: FastifyError, _: FastifyRequest, reply: FastifyReply) {
  const statusCode = error.statusCode || 500;

  reply.status(statusCode).send(getErrorResponse({
    message: error.message,
    details: {
      statusCode: error.statusCode || 500,
    },
  }));
}
