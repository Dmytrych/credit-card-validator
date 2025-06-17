import Fastify, {FastifyInstance} from 'fastify'
import {registerRoutes} from "./routes";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import {diContainer, fastifyAwilixPlugin} from '@fastify/awilix'
import {AppConfig} from "../common/configuration";
import load from "./container";
import {errorHandler} from "./error-handler";

const initPlugins = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyAwilixPlugin, {
    container: diContainer,
    disposeOnClose: true,
    asyncDispose: true,
    asyncInit: true,
    eagerInject: true,
    disposeOnResponse: false,
  })

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
}

export const initApi = async (config: AppConfig) => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    }
  }).withTypeProvider<ZodTypeProvider>();

  await initPlugins(fastify);

  fastify.diContainer.register(load(config, fastify.log))

  fastify.setErrorHandler(errorHandler)

  await fastify.register(registerRoutes, { prefix: '/v1' })

  try {
    await fastify.listen({ port: config.api.port, host: config.api.host })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
