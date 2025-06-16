import {FastifyInstance} from "fastify";

export function healthcheckRoutes(fastify: FastifyInstance) {
  fastify.get('/', (_, res) => {
    res.send({ success: true })
  })
}
