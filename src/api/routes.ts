import {FastifyInstance} from "fastify";
import {healthcheckRoutes} from "../features/healthcheck/healthcheck.route";
import {cardValidationRoutes} from "../features/cards/card.route";

export const registerRoutes = (fastify: FastifyInstance) => {
	fastify.register(healthcheckRoutes, { prefix: '/healthcheck' })
	fastify.register(cardValidationRoutes, { prefix: '/cards' })
}
